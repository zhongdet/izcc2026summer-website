/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { IntroLoader } from './components/IntroLoader';
import { SVGGlowFilters } from './components/ClubBadge';

export default function App() {
  const [visible, setVisible] = useState(true);

  const handleComplete = () => {
    // Notify parent page that animation is done
    window.parent.postMessage({ type: 'intro-complete' }, '*');
    // Fade out the animation overlay
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans flex flex-col justify-between overflow-x-hidden antialiased">
      {/* SVG Neon Filters definitions */}
      <SVGGlowFilters />

      <IntroLoader 
        onComplete={handleComplete}
      />
    </div>
  );
}
