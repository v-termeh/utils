import moment, { type MomentInput } from "moment-jalaali";

// Initialize moment-jalaali with Persian dialect
moment.loadPersian({ dialect: "persian-modern" });

// Date format constants
export const RFC3339 = "YYYY-MM-DDTHH:mm:ssZ";

// Translation map for humanized duration
const DURATION_TRANSLATIONS: Record<string, Record<"en" | "fa", string>> = {
    years: { en: "years", fa: "سال" },
    months: { en: "months", fa: "ماه" },
    days: { en: "days", fa: "روز" },
    hours: { en: "hours", fa: "ساعت" },
    minutes: { en: "minutes", fa: "دقیقه" },
    seconds: { en: "seconds", fa: "ثانیه" },
};

/**
 * Parses a standard Gregorian or Jalali date string into a Moment object.
 * Use isValid() to check if the parsed date is valid.
 * @param date - The date to parse.
 * @returns A Moment object. Check isValid() for validity.
 */
export function parse(date: MomentInput): moment.Moment {
    return moment(date);
}

/**
 * Parses a date string in RFC3339 format into a Moment object.
 * Use isValid() to check if the parsed date is valid.
 * @param date - The date string in RFC3339 format (e.g., "2023-10-05T12:30:45Z")
 * @returns A Moment object. Use isValid() to check validity.
 */
export function parseRFC3339(date?: string): moment.Moment {
    return moment(date, RFC3339, true);
}

/**
 * Parses a formatted date string into a Moment object.
 * For Jalali dates, use formats with [j] prefix (e.g., "jYYYY/jMM/jDD").
 * Use isValid() to check if the parsed date is valid.
 * @param format - The format of the date string (e.g., "YYYY-MM-DD" or "jYYYY/jMM/jDD").
 * @param date - The date string to parse (e.g., "2023-10-05" or "1402/07/13").
 * @returns A Moment object. Use isValid() to check validity.
 */
export function parseFrom(format: string, date?: string): moment.Moment {
    return moment(date, format);
}

/**
 * Returns a human-readable string representing the time difference from now.
 * @param date - The date to compare with the current time.
 * @param locale - The locale for formatting ("en" or "fa").
 * @returns A string describing the time difference (e.g., "2 hours ago" or "۲ ساعت پیش") or an empty string if the date is invalid.
 */
export function ago(date: MomentInput, locale: "en" | "fa" = "fa"): string {
    const d = moment(date);
    if (d.isValid()) {
        return d.locale(locale).fromNow();
    }
    return "";
}

/**
 * Converts a time duration to hours, minutes, and seconds.
 * @param duration - The time duration to convert.
 * @param unit - The unit of the duration ( "milliseconds", or "seconds").
 * @returns An object containing hours, minutes, and seconds.
 * @throws Error if an invalid unit is provided.
 */
export function toHMS(
    duration: number,
    unit: "milliseconds" | "seconds" = "seconds"
): { hours: number; minutes: number; seconds: number } {
    const absDuration = Math.abs(duration);
    let totalSeconds: number;

    switch (unit) {
        case "milliseconds":
            totalSeconds = Math.floor(absDuration / 1_000);
            break;
        case "seconds":
            totalSeconds = Math.floor(absDuration);
            break;
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        hours: Math.abs(hours),
        minutes: Math.abs(minutes),
        seconds: Math.abs(seconds),
    };
}

/**
 * Translates a duration value with its unit for the specified locale.
 * @param value - The duration value (e.g., 2 for 2 years).
 * @param unit - The duration unit (e.g., "years").
 * @param locale - The locale ("en" or "fa").
 * @returns A translated string (e.g., "2 years" or "۲ سال").
 */
function translateDuration(
    value: number,
    unit: string,
    locale: "en" | "fa"
): string {
    const translation = DURATION_TRANSLATIONS[unit]?.[locale] ?? unit;
    return `${value} ${translation}`;
}

/**
 * Converts a duration into a human-readable string.
 * @param duration - The duration value (e.g., 3661000 for milliseconds).
 * @param unit - The unit of the duration.
 * @param locale - The locale for formatting ("en" or "fa").
 * @returns A humanized duration string (e.g., "1 hour, 1 minute" or "۱ ساعت و ۱ دقیقه").
 */
export function humanize(
    duration: number,
    unit: moment.DurationInputArg2 = "milliseconds",
    locale: "en" | "fa" = "fa"
): string {
    const dur = moment.duration(Math.abs(duration), unit);
    const parts: string[] = [];

    const units = [
        { value: dur.years(), unit: "years" },
        { value: dur.months(), unit: "months" },
        { value: dur.days(), unit: "days" },
        { value: dur.hours(), unit: "hours" },
        { value: dur.minutes(), unit: "minutes" },
        { value: dur.seconds(), unit: "seconds" },
    ];

    for (const { value, unit } of units) {
        if (value !== 0) {
            parts.push(translateDuration(value, unit, locale));
        }
    }

    return parts.length > 0
        ? parts.join(locale === "en" ? ", " : " و ")
        : translateDuration(0, "seconds", locale);
}
