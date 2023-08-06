import { SocialIcon } from "react-social-icons";
import { socials } from "~/constants";

function Socials() {
  return (
    <div className="mt-28 flex items-center justify-center sm:gap-x-4 md:w-[400px]">
      {socials.map((social) => (
        <div
          key={social.id}
          className="animate-fade-in-3 md:hover:shadow-outline-gray group flex flex-1 cursor-pointer items-center justify-center rounded-[9px] p-5 transition duration-200 ease-out md:p-10"
        >
          <SocialIcon
            url={social.url}
            fgColor="#FFF"
            bgColor="transparent"
            className="!h-16 !w-16"
          />
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="font-medium text-[#ADB0B1] transition group-hover:text-white">
              {social.name}
            </p>
            <p className="text-[#4B4C52]">{social.handle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Socials;
