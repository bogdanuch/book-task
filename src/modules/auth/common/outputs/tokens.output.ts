import { ApiProperty } from "@nestjs/swagger";

export class TokensOutput {
  @ApiProperty({
    description: "Login jwt token",
    example:
      "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMTE3MTQ1NCwiaWF0IjoxNzAxMTcxNDU0fQ.gDY5qs4HNp8jBw5FRZYFAJO0SeWjPvDOOvYTWpGjKTU",
  })
  accessToken: string;

  @ApiProperty({
    description: "Token that should be used to get new pair of tokens",
    example:
      "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMTE3MTQ1NCwiaWF0IjoxNzAxMTcxNDU0fQ.gDY5qs4HNp8jBw5FRZYFAJO0SeWjPvDOOvYTWpGjKTU",
  })
  refreshToken: string;
}
