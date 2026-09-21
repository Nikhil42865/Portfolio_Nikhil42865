import dns from 'node:dns';

/**
 * Configure network defaults to ensure reliable IPv4 routing.
 * Cloud environments like Render containers frequently lack outbound IPv6 routing,
 * causing socket connections to IPv6 addresses (e.g. Google SMTP 2607:f8b0:...)
 * to drop with ENETUNREACH.
 */
export function configureNetworkDefaults(): void {
  // 1. Force Node.js dns.lookup to prioritize IPv4 over IPv6
  if (typeof dns.setDefaultResultOrder === 'function') {
    dns.setDefaultResultOrder('ipv4first');
  }

  // 2. Intercept direct AAAA (IPv6) queries in dns.Resolver to avoid
  // internal DNS resolvers (like Nodemailer 10's resolveHostname)
  // picking unreachable IPv6 addresses over IPv4.
  try {
    const resolverProto = dns.Resolver?.prototype as any;
    if (resolverProto && typeof resolverProto.resolve6 === 'function') {
      const originalProto = resolverProto.resolve6;
      resolverProto.resolve6 = function (...args: any[]) {
        const cb = args.find((arg) => typeof arg === 'function');
        if (cb) {
          cb(null, []);
          return;
        }
        return Promise.resolve([]);
      };
      if (originalProto && originalProto.__promisify__) {
        resolverProto.resolve6.__promisify__ = async () => [];
      }
    }

    const dnsAny = dns as any;
    if (typeof dnsAny.resolve6 === 'function') {
      const originalResolve6 = dnsAny.resolve6;
      dnsAny.resolve6 = function (...args: any[]) {
        const cb = args.find((arg) => typeof arg === 'function');
        if (cb) {
          cb(null, []);
          return;
        }
        return Promise.resolve([]);
      };
      if (originalResolve6 && originalResolve6.__promisify__) {
        dnsAny.resolve6.__promisify__ = async () => [];
      }
    }
  } catch (_e) {
    // Graceful fallback if reflection fails in non-standard runtime
  }
}

// Automatically invoke on module import
configureNetworkDefaults();
