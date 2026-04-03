import { useQuery } from '@tanstack/react-query';

import { fetchGreeting } from '../lib/api';

export function useGreeting(name?: string) {
  return useQuery({
    queryKey: ['greeting', name],
    queryFn: () => fetchGreeting(name),
  });
}
