import { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import type { User } from '../../types/resource';

interface QuizPromoCardProps {
  onClose: () => void;
  isAuthenticated?: boolean;
  user?: User | null;
}

const STORAGE_KEY = 'universe_quiz_promo_seen';

const COMING_SOON = [
  { icon: '🌐', label: 'Test CCNA 3', sub: 'Enterprise Networking' },
  { icon: '🛠️', label: 'Portfolio Builder', sub: 'No-code, 100% free' },
  { icon: '💼', label: 'TOEIC Test', sub: 'Certification anglais' },
];

export default function QuizPromoCard({ onClose, isAuthenticated, user }: QuizPromoCardProps) {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);       // 1–5 stars selected
  const [hovered, setHovered] = useState(0);     // star currently hovered
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  // Animate in
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  const handleClose = async () => {
    setVisible(false);
    // Mark as dismissed — backend (per-account) + localStorage fallback
    try {
      if (isAuthenticated) {
        await apiFetch('/v1/auth/dismiss-promo', { method: 'PATCH', requireAuth: true });
      }
    } catch {
      // silent — localStorage fallback below is enough
    }
    try { localStorage.setItem(STORAGE_KEY, 'true'); } catch { /* ignore */ }
    setTimeout(onClose, 350);
  };

  const handleSubmitReview = async () => {
    if (review.trim().length < 3 || rating === 0) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const userName = user
        ? `${user.firstname} ${user.lastname}`.trim()
        : 'Anonymous';
      const userEmail = user?.email ?? 'anonymous';
      await apiFetch('/api/feedback', {
        method: 'POST',
        json: { rating, message: review.trim(), userName, userEmail },
        signal: AbortSignal.timeout(15_000),
      });
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError('Could not send your feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-4"
      style={{ backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.70)' }}
    >
      {/* Card — full-width sheet on mobile, centered max-w card on desktop */}
      <div
        className="relative w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl"
        style={{
          maxHeight: '92dvh',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(32px)',
          transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* ── Background image ── */}
        <div className="absolute inset-0">
          <img
            src="/quiz-promo-bg1.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.4)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(5,150,105,0.2) 60%, rgba(15,23,42,0.95) 100%)',
            }}
          />
        </div>

        {/* ── Scrollable content ── */}
        <div
          className="relative z-10 overflow-y-auto"
          style={{ maxHeight: '92dvh' }}
        >
          <div className="p-5 sm:p-8 md:p-10">

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Badge */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6 pt-1">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{ background: 'rgba(16,185,129,0.25)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }}
              >
                🚀 Universe Platform
              </span>
            </div>

            {/* Headline */}
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-2 sm:mb-3 pr-10"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
            >
              You're doing great!<br />
              <span style={{ background: 'linear-gradient(90deg,#34d399,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Help us grow 💚
              </span>
            </h2>
            <p className="text-white/70 text-sm mb-5 sm:mb-8 max-w-lg">
              Universe is 100% free. A quick comment or a follow on Facebook helps us enormously to keep going and create more content for you.
            </p>

            {/* ── Two columns (stacks on mobile) ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-5 sm:mb-8">

              {/* Review box */}
              <div className="flex flex-col gap-3">
                <label className="text-white/90 text-sm font-semibold flex items-center gap-2">
                  <span>💬</span> Your feedback
                </label>
                {submitted ? (
                  <div
                    className="flex flex-col items-center justify-center h-28 rounded-2xl gap-2 text-center"
                    style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(52,211,153,0.3)' }}
                  >
                    <span className="text-2xl">🎉</span>
                    <p className="text-emerald-300 font-semibold text-sm">Thank you! Your feedback really matters.</p>
                  </div>
                ) : (
                  <>
                    {/* ── Star rating ── */}
                    <div className="flex items-center gap-1" role="group" aria-label="Star rating">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHovered(star)}
                          onMouseLeave={() => setHovered(0)}
                          className="text-2xl transition-transform duration-100 hover:scale-125 focus:outline-none"
                          style={{ color: star <= (hovered || rating) ? '#fbbf24' : 'rgba(255,255,255,0.25)', lineHeight: 1 }}
                        >
                          ★
                        </button>
                      ))}
                      {rating > 0 && (
                        <span className="ml-1 text-xs text-white/50">{rating}/5</span>
                      )}
                    </div>

                    <textarea
                      value={review}
                      onChange={e => setReview(e.target.value)}
                      placeholder="write here ..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-2xl text-sm text-white placeholder-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                    />

                    {submitError && (
                      <p className="text-red-400 text-xs">{submitError}</p>
                    )}

                    <button
                      onClick={handleSubmitReview}
                      disabled={review.trim().length < 3 || rating === 0 || submitting}
                      className="w-full py-2.5 px-6 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background: review.trim().length >= 3 && rating > 0 && !submitting
                          ? 'linear-gradient(90deg,#059669,#0891b2)'
                          : 'rgba(255,255,255,0.1)',
                        color: '#fff',
                      }}
                    >
                      {submitting ? 'Sending…' : 'Send my review ✨'}
                    </button>
                  </>
                )}
              </div>

              {/* Facebook CTA */}
              <div className="flex flex-col gap-3">
                <label className="text-white/90 text-sm font-semibold flex items-center gap-2">
                  <span>📣</span> Follow us on Facebook
                </label>
                <div
                  className="flex-1 flex flex-col justify-between p-4 rounded-2xl"
                  style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}
                >
                  <p className="text-white/70 text-xs leading-relaxed mb-3">
                    Follow our Facebook page to be the first to know about new quizzes, tools, tutorials, and more.
                  </p>
                  <a
                    href="https://www.facebook.com/profile.php?id=61578591028717"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ background: 'linear-gradient(90deg,#1877f2,#0f5cbf)' }}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Follow Universe
                  </a>
                </div>
              </div>
            </div>

            {/* ── Coming Soon chips ── */}
            <div className="mb-5 sm:mb-0">
              <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3">
                🔥 Coming soon on Universe
              </p>
              <div className="flex flex-wrap gap-2">
                {COMING_SOON.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.85)',
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    <span className="text-white/35">· {item.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="mt-5 sm:mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-white/35 text-xs text-center sm:text-left">
                Shown once only · You can continue the quiz after
              </p>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                Continue the quiz
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/** Returns true if this account has already seen the promo card */
export function hasSeenPromoCard(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/** Clears the promo-seen flag (call on logout so the next session sees the card) */
export function clearPromoCard(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
}
