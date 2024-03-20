import { Format } from "logform";
import bare from "cli-color/bare";
import * as clc from "cli-color";
import { format } from "winston";
import safeStringify from "fast-safe-stringify";

const nestLikeColorScheme: Record<string, bare.Format> = {
  info: clc.greenBright,
  error: clc.red,
  warn: clc.yellow,
  debug: clc.magentaBright,
  verbose: clc.cyanBright,
};

interface ConsoleFormatData {
  appName?: string;
  isProductionMode?: boolean;
}

export const nestLikeConsoleFormat = (consoleFormatData: ConsoleFormatData): Format =>
  format.printf(({ context, level, timestamp, message, ...meta }) => {
    const color = nestLikeColorScheme[level] || ((text: string): string => text);
    const appName = consoleFormatData.appName ?? "LFH-back";

    return consoleFormatData.isProductionMode
      ? `${`${appName} ` + `${level.toUpperCase()}\t`}${
          typeof timestamp !== "undefined" ? `${new Date(timestamp).toLocaleString()}:\t\t` : ""
        }${typeof context !== "undefined" ? `[${context}] ` : ""}${message}${
          meta.trace ? ` - ${safeStringify(meta.trace)}` : ``
        }`
      : `${`${color(`[${appName}]`)} ` + `${clc.yellow(level.charAt(0).toUpperCase() + level.slice(1))}\t`}${
          typeof timestamp !== "undefined" ? `${new Date(timestamp).toLocaleString()} ` : ""
        }${typeof context !== "undefined" ? `${clc.yellow(`[${context}]`)} ` : ""}${color(message)}${
          meta.trace ? ` - ${safeStringify(meta.trace)}` : ``
        }`;
  });
