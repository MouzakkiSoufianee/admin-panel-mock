import Image from "next/image";

interface LogoSectionProps {
  isCollapsed: boolean;
}

export function LogoSection({ isCollapsed }: LogoSectionProps) {
  return (
    <div className={`flex items-center px-2 ${isCollapsed ? 'justify-start' : ''} mb-12`}>
      {isCollapsed ? (
        <Image
          src="/assets/logos/AdminP-logo-collapsed.svg"
          alt="GamiTool Logo"
          width={40}
          height={40}
        />
      ) : (
        <Image
          src="/assets/logos/GamiPanel-logo.svg"
          alt="GamiPanel Logo"
          width={140}
          height={40}
        />
      )}
    </div>
  );
}
