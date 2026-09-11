import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Centralized SPA Scroll Restoration Manager for Eduvia
 * 
 * Rules:
 * 1. Genuine route changes (pathname changes e.g. '/' -> '/courses?category=...'):
 *    - On PUSH: Start newly mounted route's main content cleanly at (0, 0).
 *    - On POP (Browser Back/Forward): Restore recorded scroll offset for that route.
 * 2. Same-pathname in-page state changes (e.g. '/courses' -> '/courses?category=AI...'):
 *    - Preserves current scroll position.
 * 3. In-page non-navigational interactions (modals, tabs, dropdowns):
 *    - Does not alter scroll.
 * 4. Disables conflicting native browser scroll restoration ('manual').
 */
export default function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType(); // 'POP' | 'PUSH' | 'REPLACE'
  const prevPathRef = useRef(location.pathname);
  const scrollMap = useRef(new Map());

  // Configure browser scroll restoration to manual
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Save current scroll position on scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || document.documentElement.scrollTop || 0;
      if (location.key) {
        scrollMap.current.set(location.key, currentY);
      }
      scrollMap.current.set(location.pathname, currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.key, location.pathname]);

  // Handle route transition scroll behavior
  useLayoutEffect(() => {
    const isPathnameChange = prevPathRef.current !== location.pathname;
    prevPathRef.current = location.pathname;

    if (isPathnameChange) {
      // Genuine route transition between different paths
      if (navType === 'POP') {
        // Browser Back or Forward pressed: restore saved position
        const savedPos = scrollMap.current.get(location.key) ?? scrollMap.current.get(location.pathname);
        if (typeof savedPos === 'number') {
          window.scrollTo({ top: savedPos, left: 0, behavior: 'instant' });
          return;
        }
      }

      // Forward navigation (PUSH) or unrecorded POP to new route: start at top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    } else {
      // Same pathname (e.g., query param / filter change on /courses)
      // Do NOT reset scroll; allow in-page filter state to update seamlessly.
    }
  }, [location.pathname, location.key, navType]);

  return null;
}
