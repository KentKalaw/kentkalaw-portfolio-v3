// Prompt Injection Protection Module
// Protects against various prompt injection attacks

// Maximum allowed message length
const MAX_MESSAGE_LENGTH = 1000;

// Suspicious patterns that might indicate prompt injection
const INJECTION_PATTERNS = [
  // Direct instruction overrides
  /ignore\s+(all\s+)?(previous|prior|above|earlier)\s+(instructions?|prompts?|rules?|guidelines?)/i,
  /disregard\s+(all\s+)?(previous|prior|above|earlier)\s+(instructions?|prompts?|rules?)/i,
  /forget\s+(all\s+)?(previous|prior|above|earlier)\s+(instructions?|prompts?|rules?)/i,
  /override\s+(all\s+)?(previous|prior|system)\s+(instructions?|prompts?|rules?)/i,
  
  // Role manipulation
  /you\s+are\s+now\s+(a|an|the)\s+/i,
  /pretend\s+(you'?re?|to\s+be)\s+(a|an|the)?\s*/i,
  /act\s+as\s+(a|an|if|though)\s+/i,
  /roleplay\s+as\s+/i,
  /switch\s+(to|into)\s+(a|an)?\s*\w+\s+mode/i,
  /enter\s+\w+\s+mode/i,
  /activate\s+\w+\s+mode/i,
  
  // System prompt extraction
  /what\s+(are|is)\s+(your|the)\s+(system\s+)?(prompt|instructions?|rules?|guidelines?)/i,
  /show\s+(me\s+)?(your|the)\s+(system\s+)?(prompt|instructions?)/i,
  /reveal\s+(your|the)\s+(system\s+)?(prompt|instructions?)/i,
  /display\s+(your|the)\s+(system\s+)?(prompt|instructions?)/i,
  /print\s+(your|the)\s+(system\s+)?(prompt|instructions?)/i,
  /output\s+(your|the)\s+(system\s+)?(prompt|instructions?)/i,
  /repeat\s+(your|the)\s+(system\s+)?(prompt|instructions?)/i,
  /tell\s+me\s+(your|the)\s+(system\s+)?(prompt|instructions?)/i,
  
  // Jailbreak attempts
  /\bDAN\b/,
  /\bdo\s+anything\s+now\b/i,
  /\bjailbreak\b/i,
  /\bunlock\b.*\bmode\b/i,
  /\bdeveloper\s+mode\b/i,
  /\badmin\s+mode\b/i,
  /\bdebug\s+mode\b/i,
  /\btest\s+mode\b/i,
  /\bgod\s+mode\b/i,
  /\bsuper\s*user\b/i,
  /\broot\s+access\b/i,
  
  // Code injection attempts
  /```\s*(system|assistant|user)\s*\n/i,
  /\[\s*(system|SYSTEM)\s*\]/i,
  /<\s*(system|SYSTEM)\s*>/i,
  /\{\s*"role"\s*:\s*"system"/i,
  
  // Delimiter confusion
  /\n{3,}/,
  /#{5,}/,
  /={5,}/,
  /-{5,}/,
  
  // Instruction injection markers
  /\[INST\]/i,
  /\[\/INST\]/i,
  /<\|im_start\|>/i,
  /<\|im_end\|>/i,
  /<<SYS>>/i,
  /<\/SYS>/i,
  
  // Manipulation attempts
  /bypass\s+(the\s+)?(filter|safety|restriction|rule)/i,
  /avoid\s+(the\s+)?(filter|safety|restriction|rule)/i,
  /circumvent\s+(the\s+)?(filter|safety|restriction)/i,
  /escape\s+(the\s+)?(filter|sandbox|restriction)/i,
  /break\s+(out\s+of|free\s+from)\s+(the\s+)?(filter|rules?|restrictions?)/i,
];

// Blocked keywords/phrases
const BLOCKED_KEYWORDS = [
  "ignore previous",
  "ignore all previous",
  "disregard previous",
  "forget previous",
  "new instructions",
  "actual instructions",
  "real instructions",
  "hidden instructions",
  "secret instructions",
  "true purpose",
  "real purpose",
  "system prompt",
  "initial prompt",
  "original prompt",
  "base prompt",
];

// Characters that should be escaped or limited
const DANGEROUS_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

export interface SanitizationResult {
  isValid: boolean;
  sanitizedMessage: string;
  rejectionReason?: string;
}

/**
 * Sanitizes and validates user input against prompt injection attacks
 */
export function sanitizeInput(message: string): SanitizationResult {
  // Check for empty message
  if (!message || typeof message !== "string") {
    return {
      isValid: false,
      sanitizedMessage: "",
      rejectionReason: "Invalid message format",
    };
  }

  // Trim and normalize whitespace
  let sanitized = message.trim();

  // Check length
  if (sanitized.length > MAX_MESSAGE_LENGTH) {
    return {
      isValid: false,
      sanitizedMessage: "",
      rejectionReason: "Message is too long. Please keep it under 1000 characters.",
    };
  }

  // Remove dangerous control characters
  sanitized = sanitized.replace(DANGEROUS_CHARS, "");

  // Normalize unicode to prevent homograph attacks
  sanitized = sanitized.normalize("NFKC");

  // Check against injection patterns
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(sanitized)) {
      console.warn("Prompt injection attempt detected:", {
        pattern: pattern.toString(),
        message: sanitized.substring(0, 100),
      });
      return {
        isValid: false,
        sanitizedMessage: "",
        rejectionReason: "I can only answer questions about Kent's portfolio. How can I help you with that?",
      };
    }
  }

  // Check against blocked keywords (case-insensitive)
  const lowerMessage = sanitized.toLowerCase();
  for (const keyword of BLOCKED_KEYWORDS) {
    if (lowerMessage.includes(keyword.toLowerCase())) {
      console.warn("Blocked keyword detected:", keyword);
      return {
        isValid: false,
        sanitizedMessage: "",
        rejectionReason: "I can only answer questions about Kent's portfolio. How can I help you with that?",
      };
    }
  }

  // Check for excessive special characters (potential delimiter injection)
  const specialCharRatio = (sanitized.match(/[^a-zA-Z0-9\s.,!?'-]/g) || []).length / sanitized.length;
  if (specialCharRatio > 0.3 && sanitized.length > 20) {
    return {
      isValid: false,
      sanitizedMessage: "",
      rejectionReason: "Please use regular text in your message.",
    };
  }

  // Check for repeated patterns (potential token stuffing)
  const repeatedPattern = /(.{10,})\1{2,}/;
  if (repeatedPattern.test(sanitized)) {
    return {
      isValid: false,
      sanitizedMessage: "",
      rejectionReason: "Please avoid repeating text patterns.",
    };
  }

  return {
    isValid: true,
    sanitizedMessage: sanitized,
  };
}

/**
 * Wraps user message with safety markers to prevent context confusion
 */
export function wrapUserMessage(message: string): string {
  return `[User Question]: ${message}`;
}

/**
 * Validates AI output to prevent leaking sensitive information
 */
export function validateOutput(output: string): string {
  // Check if the AI might have leaked system prompt info
  const sensitivePatterns = [
    /your (system |initial |base )?prompt is/i,
    /my (system |initial |base )?prompt is/i,
    /the (system |initial |base )?prompt (is|says|reads)/i,
    /here('s| is| are) (my |the |your )?(system |initial )?instructions?/i,
    /I was (instructed|told|programmed) to/i,
  ];

  for (const pattern of sensitivePatterns) {
    if (pattern.test(output)) {
      return "I'm Kent's AI assistant. How can I help you learn about his portfolio today?";
    }
  }

  return output;
}

/**
 * Rate limiting helper - tracks requests per session
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

export function checkRateLimit(sessionId: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(sessionId);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(sessionId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

// Cleanup old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 60000);
