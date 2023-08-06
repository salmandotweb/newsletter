import { getPlaneKeyframes } from "~/lib/getPlaneKeyframes";
import { getTrailsKeyframes } from "~/lib/getTrailsKeyframes";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { gsap } from "gsap";
import { FormEvent, useRef, useState } from "react";
import { api } from "~/utils/api";

function NewsletterForm() {
  const subscribe = api.subscription.subscribe.useMutation();
  const [input, setInput] = useState("");
  const [successMessage, setSuccessMessage] =
    useState<MembersSuccessResponse>();
  const [errorMessage, setErrorMessage] = useState("");
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { to, fromTo, set } = gsap;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = input;
    const button = buttonRef.current;

    if (!email || !button) return;

    if (!active) {
      setActive(true);

      to(button, {
        keyframes: getPlaneKeyframes(set, fromTo, button, setActive, setInput),
      });

      to(button, { keyframes: getTrailsKeyframes(button) });
    }

    subscribe.mutate({
      email: email,
    });

    setErrorMessage("Hey, you are already subscribed!");
    setSuccessMessage(undefined);
    return;

    // setSuccessMessage(data.res);
    // setErrorMessage("");
  };

  const dismissMessages = () => {
    setSuccessMessage(undefined);
    setErrorMessage("");
  };

  return (
    <div className="flex flex-col space-y-8 md:w-[400px]">
      <form
        onSubmit={handleSubmit}
        className="newsletter-form animate-fade-in-3 mt-10"
      >
        <div className="shadow-outline-gray focus-within:!shadow-outline-gray-focus group flex items-center gap-x-4 rounded-[9px] bg-[#090D11] py-1 pl-4 pr-1 transition-all duration-300 focus-within:bg-[#15141B] hover:bg-[#15141B] hover:shadow-transparent">
          <EnvelopeIcon className="hidden h-6 w-6 text-[#4B4C52] transition-colors duration-300 group-focus-within:text-white group-hover:text-white sm:inline" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Email address"
            required
            type="email"
            className="flex-1 bg-transparent text-sm text-white placeholder-[#4B4C52] outline-none placeholder:transition-colors placeholder:duration-300 group-focus-within:placeholder-white sm:text-base"
          />
          <button
            ref={buttonRef}
            className={`${
              active && "active"
            } text-sm disabled:cursor-not-allowed disabled:!bg-[#17141F] disabled:opacity-50 disabled:grayscale-[65%] md:text-base`}
            disabled={!input}
            type="submit"
          >
            <span className="default">Subscribe</span>
            <span className="success">
              <svg viewBox="0 0 16 16">
                <polyline points="3.75 9 7 12 13 5"></polyline>
              </svg>
              Done
            </span>
            <svg className="trails" viewBox="0 0 33 64">
              <path d="M26,4 C28,13.3333333 29,22.6666667 29,32 C29,41.3333333 28,50.6666667 26,60"></path>
              <path d="M6,4 C8,13.3333333 9,22.6666667 9,32 C9,41.3333333 8,50.6666667 6,60"></path>
            </svg>
            <div className="plane">
              <div className="left"></div>
              <div className="right"></div>
            </div>
          </button>
        </div>
      </form>

      <div className="relative">
        {(successMessage ?? errorMessage) && (
          <div className="shadow-outline-gray animate-fade-bottom absolute flex items-start space-x-2 rounded-[9px] bg-[#0A0E12] px-6 py-4 text-white">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[#273130] bg-[#1B2926]">
              <CheckIcon className="h-4 w-4 text-[#81A89A]" />
            </div>
            <div className="text-xs text-[#4B4C52] sm:text-sm">
              {successMessage ? (
                <p>
                  We&apos;ve added{" "}
                  <span className="text-[#ADB0B1]">
                    {successMessage.email_address}
                  </span>{" "}
                  to our waitlist. We&apos;ll let you know when we launch!
                </p>
              ) : (
                <p>
                  You are already added to our waitlist. We&apos;ll let you know
                  when we launch!
                </p>
              )}
            </div>
            <XMarkIcon
              className="h-5 w-5 flex-shrink-0 cursor-pointer text-[#4A4B55]"
              onClick={dismissMessages}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsletterForm;
