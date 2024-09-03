import rss from "@astrojs/rss";

import { getCollection } from "astro:content";

type MonthAbbreviation =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

const months: Record<MonthAbbreviation, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

function formatDate(dateString: string): string {
  // Regular expression to match the date format
  const regex = /(\w{3})\s(\d{1,2})(?:st|nd|rd|th),\s(\d{4})/;

  // Extract date components
  const match = dateString.match(regex);

  if (!match) {
    throw new Error('Invalid date format. Expected format: "Mon DDth, YYYY"');
  }

  const [, month, day, year] = match;

  // Type assertion to ensure month is a valid MonthAbbreviation
  if (!isValidMonth(month)) {
    throw new Error("Invalid month abbreviation");
  }

  // Pad the day with a leading zero if necessary
  const paddedDay = day.padStart(2, "0");

  // Return the formatted date
  return `${year}-${months[month]}-${paddedDay}`;
}

// Type guard to check if a string is a valid MonthAbbreviation
function isValidMonth(month: string): month is MonthAbbreviation {
  return month in months;
}

export async function GET(context: any) {
  const blog = await getCollection("post");

  console.log(blog);

  return rss({
    title: "Dodycode",
    description: "A Fullstack Developer's Blog",
    site: context.site,
    items: blog.map((post: any) => ({
      title: post.data.title,
      pubDate: formatDate(post.data.dateFormatted),
      description: post.data.description,
      // Compute RSS link from post `slug`
      link: `/post/${post.slug}/`,
    })),
  });
}
