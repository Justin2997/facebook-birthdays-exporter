function createCalendarEvent(event) {
    const { title, start, end, location, description } = event;
  
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `DTSTART:${start.toISOString().replace(/-|:|\.\d+/g, '')}`,
      `DTEND:${end.toISOString().replace(/-|:|\.\d+/g, '')}`,
      'RRULE:FREQ=YEARLY',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  

function extractNamesAndAnniversaries() {
    // Regex to match potential dates for the entire year in French, English, and Spanish
    const dateRegex = /\d{1,2} (janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre|january|february|march|april|may|june|july|august|september|october|november|december|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/g;

    // Focuse more on the birdthday list
    const listBody = document.querySelector('div[role="main"]');

    // Get all text nodes in the document
    let textNodes = [];
    let walker = document.createTreeWalker(listBody, NodeFilter.SHOW_TEXT, null, false);
    let node = walker.nextNode();
    while (node) {
        if (node.nodeValue.trim().length > 1 && node.nodeValue.trim().length < 50) {
            textNodes.push(node.nodeValue.trim());
        }
        node = walker.nextNode();
    }

    // Find names and dates based on proximity
    let pairs = [];
    textNodes.forEach((text, index) => {
        if (dateRegex.test(text) && index > 0 && !dateRegex.test(textNodes[index - 1])) {
            pairs.push({ name: textNodes[index - 1], date: text });
        }
    });

    pairs.forEach((pair) => {
        console.log(pair.name + " " + pair.date);

        // Start date at date of birth at 9 AM
        const start = new Date(pair.date);
        start.setHours(9);
        start.setFullYear(new Date().getFullYear());

        // End date at date of birth at 10 AM
        const end = new Date(pair.date);
        end.setHours(10);
        end.setFullYear(new Date().getFullYear());

        // Create the event
        var event = {
            title: "Birthday of " + pair.name,
            start: start,
            end: end,
            description: "Birthday of " + pair.name,
        };

        // Generate the iCalendar data
        var icsFileContent = createCalendarEvent(event);

        // Trigger the download
        download('birday_' + pair.name + '.ics', icsFileContent);
    });
}

extractNamesAndAnniversaries();