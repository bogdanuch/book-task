import { validateSync } from "class-validator";
import { plainToInstance } from "class-transformer";
import { ValidationSchema } from "./validation-schema";

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(ValidationSchema, config);

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
