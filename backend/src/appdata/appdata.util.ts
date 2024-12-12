export const DEFAULT_LANG = 'en';

export const getTranslateValue = (
  element: Record<string, any>,
  key: string,
) => {
  const name = {};

  if (Array.isArray(element[key])) {
    element[key].forEach((value) => {
      const lang = value._attributes?.['xml:lang'] ?? DEFAULT_LANG;
      name[lang] = value._text;
    });

    return name;
  }

  name[DEFAULT_LANG] = element[key]._text;
  return name;
};

export const getAppIcon = (element: Record<string, any>) => {
  if (Array.isArray(element.icon) && element.icon.length > 0) {
    return element.icon[0]._text;
  }

  return null;
};

export const getArrayValue = (element: Record<string, any>) => {
  const values = element;

  if (!values) {
    return [];
  }

  if (Array.isArray(values)) {
    return values.map((item) => item._text);
  }

  return [values._text];
};

export const extractUrls = (element: Record<string, any>) => {
  const urls = element.url;

  if (Array.isArray(urls)) {
    return urls.map((item) => ({
      type: item._attributes?.type,
      text: item._text,
    }));
  }

  if (urls) {
    return [
      {
        type: urls._attributes?.type,
        text: urls._text,
      },
    ];
  }

  return [];
};

export const extractScreenshots = (element: Record<string, any>) => {
  const screenshots = element;

  if (!screenshots) {
    return [];
  }

  if (Array.isArray(screenshots)) {
    return screenshots.map((item) => ({
      type: item._attributes?.type,
      caption: item?.caption,
      image: {
        type: item?.image?._attributes?.type,
        url: item?.image?._text,
      },
    }));
  }

  if (screenshots) {
    return [
      {
        image: {
          type: screenshots?.image?._attributes?.type,
          url: screenshots?.image?._text,
        },
      },
    ];
  }

  return [];
};

export const extractReleases = (element: Record<string, any>) => {
  const releases = element;

  if (!releases) {
    return [];
  }

  if (Array.isArray(releases)) {
    return releases.map((item) => ({
      timestamp: item?._attributes.timestamp * 1000,
      description: extractDescription(item),
      issues: extractIssues(item?.issues?.issue),
      version: item?._attributes?.version,
    }));
  }

  if (releases) {
    return [
      {
        timestamp: releases?._attributes.timestamp * 1000,
        description: extractDescription(releases),
        issues: extractIssues(releases?.issues?.issue),
        version: releases?._attributes?.version,
      },
    ];
  }

  return [];
};

export const extractDescription = (element: Record<string, any>) => {
  if (!element.description) {
    return {};
  }

  const description = {};

  if (Array.isArray(element.description)) {
    element.description.forEach((value) => {
      const lang = value._attributes?.['xml:lang'] ?? DEFAULT_LANG;
      description[lang] = extractHtml(value);
    });

    return description;
  }

  description[DEFAULT_LANG] = extractHtml(element.description);
  return description;
};

export const extractHtml = (value: Record<string, any>) => {
  let htmlContent = '';

  Object.keys(value).forEach((key) => {
    const element = value[key];

    // Manejo de múltiples <p>
    if (key === 'p') {
      if (Array.isArray(element)) {
        element.forEach((item) => {
          if (item._text) {
            htmlContent += `<p>${item._text}</p>`;
          }
        });
      } else if (element._text) {
        htmlContent += `<p>${element._text}</p>`;
      }
    }

    // Manejo de múltiples <ul>
    if (key === 'ul') {
      if (Array.isArray(element)) {
        element.forEach((ulItem) => {
          htmlContent += '<ul>';
          if (ulItem.li) {
            if (Array.isArray(ulItem.li)) {
              ulItem.li.forEach((liItem) => {
                if (liItem._text) {
                  htmlContent += `<li>${liItem._text}</li>`;
                }
              });
            } else if (ulItem.li._text) {
              htmlContent += `<li>${ulItem.li._text}</li>`;
            }
          }
          htmlContent += '</ul>';
        });
      } else if (element.li) {
        htmlContent += '<ul>';
        if (Array.isArray(element.li)) {
          element.li.forEach((liItem) => {
            if (liItem._text) {
              htmlContent += `<li>${liItem._text}</li>`;
            }
          });
        } else if (element.li._text) {
          htmlContent += `<li>${element.li._text}</li>`;
        }
        htmlContent += '</ul>';
      }
    }
  });

  return htmlContent;
};

export const extractIssues = (element: Record<string, any>) => {
  const values = element;

  if (!values) {
    return [];
  }

  if (Array.isArray(values)) {
    return values.map((item) => ({
      url: item?._attributes?.url,
      issue: item._text,
    }));
  }

  return [
    {
      url: values?._attributes?.url,
      issue: values?._text,
    },
  ];
};

export const extractMetaData = (element: Record<string, any>) => {
  const values = element;

  if (!values) {
    return [];
  }

  if (Array.isArray(values)) {
    return values.map((item) => ({
      key: item?._attributes?.key,
      value: item?._text,
    }));
  }

  return [
    {
      key: values?._attributes?.key,
      value: values?._text,
    },
  ];
};

export const extractBranding = (element: Record<string, any>) => {
  if (!element?.branding || !element?.branding?.color) {
    return [];
  }

  const color = element?.branding?.color;

  if (Array.isArray(color)) {
    return color.map((item) => ({
      type: item?._attributes?.type,
      scheme_preference: item?._attributes?.scheme_preference,
      value: item?._text,
    }));
  }

  return [
    {
      type: color?._attributes?.type,
      scheme_preference: color?._attributes?.scheme_preference,
      value: color?._text,
    },
  ];
};

export const extractDeveloper = (element: Record<string, any>) => {
  let name = {};

  if (element?.developer?.name) {
    if (Array.isArray(element?.developer?.name)) {
      element?.developer?.name.forEach((value) => {
        const lang = value._attributes?.['xml:lang'] ?? DEFAULT_LANG;
        name[lang] = value._text;
      });

      return name;
    }

    name[DEFAULT_LANG] = element?.developer?.name._text;
    return name;
  }

  if (element?.developer_name) {
    name[DEFAULT_LANG] = element?.developer_name._text;
    return name;
  }

  name[DEFAULT_LANG] = 'Unknown';
  return name;
};
