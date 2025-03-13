
  export function  isValidEmail (value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };
  
  export function extractCode(inputString: string) {
    const regex = /code=([A-Z_]+)/;
    const callExceptionRegex = /code=CALL_EXCEPTION/i;
    const match = inputString.match(regex);
    const callExceptionMatch = inputString.match(callExceptionRegex);
    if (match && match[1]) {
      return match[1];
    } else if (callExceptionMatch) {
      return "BEP20execution";
    } else {
      return null;
    }
  }
