'use client';

import { useEffect, useState } from 'react';
import {
  allProperties as staticAll,
  rentalTransactions as staticRent,
  maintenanceTransactions as staticMaint,
  utilityBillTransactions as staticUtil,
} from './properties';

type Bundle = {
  allProperties: typeof staticAll;
  rentalTransactions: typeof staticRent;
  maintenanceTransactions: typeof staticMaint;
  utilityBillTransactions: typeof staticUtil;
  loading: boolean;
};

let cache: Bundle | null = null;
let inflight: Promise<Bundle | null> | null = null;

const fallback: Bundle = {
  allProperties: staticAll,
  rentalTransactions: staticRent,
  maintenanceTransactions: staticMaint,
  utilityBillTransactions: staticUtil,
  loading: true,
};

export function usePropertiesData(): Bundle {
  const [state, setState] = useState<Bundle>(cache ?? fallback);

  useEffect(() => {
    if (cache) {
      setState(cache);
      return;
    }
    if (!inflight) {
      inflight = fetch('/api/properties', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (d && Array.isArray(d.allProperties)) {
            cache = { ...d, loading: false };
          } else {
            cache = null;
          }
          return cache;
        })
        .catch(() => {
          cache = null;
          inflight = null;
          return null;
        });
    }
    inflight.then((d) => {
      if (d) setState(d);
    });
  }, []);

  return state;
}
