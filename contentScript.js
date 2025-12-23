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

function dateStringToDate(dateStr) {
    // Map month names to month numbers for each language
    const monthMaps = {
      'en': {
        january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
        july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
      },
      'fr': {
        janvier: 0, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
        juillet: 6, août: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11,
      },
      'es': {
        enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
        julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
      }
    };
  
    // Determine the browser's language
    let lang = navigator.language.slice(0, 2); // Get first two characters
    if (!monthMaps[lang]) lang = 'en'; // Default to English if unsupported language
  
    // Use the appropriate month map
    const monthMap = monthMaps[lang];
  
    // Split the date string to extract day, month name, and year
    const parts = dateStr.split(' ');
    
    // Extract day, month name, and year from parts
    const day = parseInt(parts[0], 10);
    const monthName = parts[1].toLowerCase();
    let year = parseInt(parts[2], 10);
    if (!year) {
        year = new Date().getFullYear();
    }
    
    // Convert month name to month number
    const month = monthMap[monthName];
    
    // Create and return a new Date object
    return new Date(year, month, day);
}  

const APP_STORE_LINK = "https://apps.apple.com/ca/app/evenix/id1490629746";

function resolveLocalizedCopy() {
    const lang = navigator.language.toLowerCase();
    if (lang.startsWith("fr")) {
        return {
            title: "Téléchargez l'application mobile Evenix",
            cta: "Ouvrir dans l'App Store"
        };
    }

    return {
        title: "Download the Evenix mobile app",
        cta: "Open in the App Store"
    };
}

function createDownloadBanner() {
    if (document.getElementById("evenix-download-banner")) return;

    const { title, cta } = resolveLocalizedCopy();

    const banner = document.createElement("div");
    banner.id = "evenix-download-banner";
    banner.style.position = "fixed";
    banner.style.top = "0";
    banner.style.left = "0";
    banner.style.right = "0";
    banner.style.zIndex = "2147483647"; // Above Facebook header
    banner.style.background = "#1877F2";
    banner.style.color = "#fff";
    banner.style.display = "flex";
    banner.style.alignItems = "center";
    banner.style.justifyContent = "space-between";
    banner.style.padding = "12px 16px";
    banner.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
    banner.style.fontFamily = "Helvetica, Arial, sans-serif";

    const text = document.createElement("span");
    text.textContent = title;
    text.style.fontSize = "14px";
    text.style.fontWeight = "600";

    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.alignItems = "center";
    actions.style.gap = "8px";

    const link = document.createElement("a");
    link.href = APP_STORE_LINK;
    link.textContent = cta;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.background = "#fff";
    link.style.color = "#1877F2";
    link.style.padding = "8px 12px";
    link.style.borderRadius = "999px";
    link.style.fontSize = "13px";
    link.style.fontWeight = "600";
    link.style.textDecoration = "none";

    const close = document.createElement("button");
    close.setAttribute("aria-label", "Dismiss app download banner");
    close.textContent = "×";
    close.style.background = "transparent";
    close.style.border = "none";
    close.style.color = "#fff";
    close.style.fontSize = "20px";
    close.style.cursor = "pointer";

    close.addEventListener("click", () => {
        banner.remove();
        document.body.style.paddingTop = "";
    });

    actions.appendChild(link);
    actions.appendChild(close);
    banner.appendChild(text);
    banner.appendChild(actions);

    document.body.appendChild(banner);
    const bannerHeight = banner.getBoundingClientRect().height;
    document.body.style.paddingTop = `${bannerHeight}px`;
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
        const start = dateStringToDate(pair.date);
        start.setHours(9);
        start.setFullYear(new Date().getFullYear());

        // End date at date of birth at 10 AM
        const end = dateStringToDate(pair.date);
        end.setHours(10);
        end.setFullYear(new Date().getFullYear());

        // Create the event
        var event = {
            title: "Birthday of " + pair.name,
            start: start,
            end: end,
            description: "Birthday of " + pair.name,
        };

        console.log("event params: " + event.title + " " + event.start + " " + event.end + " " + event.description)

        // Generate the iCalendar data
        var icsFileContent = createCalendarEvent(event);

        // Trigger the download
        download('birthday_' + pair.name + '.ics', icsFileContent);
    });
}

if (window.location.href.includes("facebook.com/events/birthdays")) {
    createDownloadBanner();
    extractNamesAndAnniversaries();
}