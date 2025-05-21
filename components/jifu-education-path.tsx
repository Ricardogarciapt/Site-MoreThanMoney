"use client"
import { useConfigStore } from "@/store/config"

export default function JifuEducationPath({ affiliateRef }) {
  const { config } = useConfigStore()
  const jifuAffiliateLink = affiliateRef
    ? `https://${affiliateRef}.jifu.com`
    : localStorage.getItem("jifuAffiliateRef")
      ? `https://${localStorage.getItem("jifuAffiliateRef")}.jifu.com`
      : config.affiliateLinks?.jifuAffiliateLink || "https://ricardogarcia.jifu.com"

  const handleRegisterClick = () => {
    window.open(jifuAffiliateLink, "_blank")
  }

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="mb-10 md:mb-16">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">JIFU Education Path</h2>

          <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
            Unlock your potential with JIFU's comprehensive education path. Learn, grow, and achieve your goals with our
            expert-led courses and resources.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Course 1 */}
          <div className="flex flex-col bg-gray-100 rounded-lg overflow-hidden">
            <a href="#" className="group h-48 md:h-64 block bg-gray-200 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
                loading="lazy"
                alt="Photo by Austin Distel"
                className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
              />
            </a>

            <div className="flex flex-col flex-1 p-4 sm:p-6">
              <h2 className="text-gray-800 text-xl font-semibold mb-2">Course 1: Introduction to JIFU</h2>
              <p className="text-gray-500 mb-4">Get started with the basics of JIFU and its mission.</p>

              <div className="flex justify-between items-end mt-auto">
                <a
                  href="#"
                  className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-semibold transition duration-100"
                >
                  Learn more
                </a>
                <button
                  onClick={handleRegisterClick}
                  className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-2"
                >
                  Register
                </button>
              </div>
            </div>
          </div>

          {/* Course 2 */}
          <div className="flex flex-col bg-gray-100 rounded-lg overflow-hidden">
            <a href="#" className="group h-48 md:h-64 block bg-gray-200 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38f487941?auto=format&q=75&fit=crop&w=600"
                loading="lazy"
                alt="Photo by Samuel Zeller"
                className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
              />
            </a>

            <div className="flex flex-col flex-1 p-4 sm:p-6">
              <h2 className="text-gray-800 text-xl font-semibold mb-2">Course 2: Travel Hacking Secrets</h2>
              <p className="text-gray-500 mb-4">Discover the secrets to affordable and luxurious travel.</p>

              <div className="flex justify-between items-end mt-auto">
                <a
                  href="#"
                  className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-semibold transition duration-100"
                >
                  Learn more
                </a>
                <button
                  onClick={handleRegisterClick}
                  className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-2"
                >
                  Register
                </button>
              </div>
            </div>
          </div>

          {/* Course 3 */}
          <div className="flex flex-col bg-gray-100 rounded-lg overflow-hidden">
            <a href="#" className="group h-48 md:h-64 block bg-gray-200 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47a04ca0ecd8?auto=format&q=75&fit=crop&w=600"
                loading="lazy"
                alt="Photo by Brooke Lark"
                className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
              />
            </a>

            <div className="flex flex-col flex-1 p-4 sm:p-6">
              <h2 className="text-gray-800 text-xl font-semibold mb-2">Course 3: Financial Freedom Blueprint</h2>
              <p className="text-gray-500 mb-4">Learn how to achieve financial independence with JIFU.</p>

              <div className="flex justify-between items-end mt-auto">
                <a
                  href="#"
                  className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-semibold transition duration-100"
                >
                  Learn more
                </a>
                <button
                  onClick={handleRegisterClick}
                  className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-2"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleRegisterClick}
            className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
          >
            Start Your Journey Now
          </button>
        </div>
      </div>
    </div>
  )
}
