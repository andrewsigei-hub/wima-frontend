import { ReactGoogleReviews } from 'react-google-reviews'
import 'react-google-reviews/dist/index.css'

const ReviewsSection = () => {
  const featurableId = import.meta.env.VITE_GOOGLE_REVIEWS_FEATURABLE_ID

  const isConfigured = Boolean(featurableId)

  return (
    <section id="reviews" className="py-20 md:py-24 bg-green-mist/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-heritage-gold uppercase tracking-widest mb-3 block">
            Guest Voices
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-botanical">
            What Our Guests Say
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-heritage-gold-soft/40 shadow-lg p-6 md:p-8">
          {isConfigured ? (
            <ReactGoogleReviews
              layout="carousel"
              featurableId={featurableId}
              maxItems={3}
              theme="light"
              reviewVariant="card"
              carouselClassName="max-w-6xl mx-auto"
              carouselCardClassName="px-2 md:px-3"
              carouselBtnClassName="!border !border-heritage-gold-soft/70 !bg-[#f8f3e7] !text-botanical hover:!bg-[#efe6cd]"
              carouselBtnLeftClassName="!left-0 md:!left-2"
              carouselBtnRightClassName="!right-0 md:!right-2"
              reviewCardClassName="!rounded-2xl !border !border-heritage-gold-soft/40 !shadow-md !bg-[#fffdf8]"
              reviewBodyCardClassName="!mt-4"
              reviewTextClassName="!text-slate-700 !leading-relaxed !text-sm md:!text-base"
              reviewReadMoreClassName="!text-botanical !font-semibold"
              reviewerNameClassName="!text-botanical !font-semibold"
              reviewerDateClassName="!text-slate-500 !text-sm"
              reviewFooterClassName="!mt-5 !pt-4 !border-t !border-heritage-gold-soft/30"
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-700 font-medium mb-2">Google Reviews is not configured yet.</p>
              <p className="text-sm text-slate-500">
                Add <code className="text-botanical">VITE_GOOGLE_REVIEWS_FEATURABLE_ID</code> to your frontend env files.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection