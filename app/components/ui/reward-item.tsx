import * as React from "react"

export type RewardVariant = "bronze" | "silver" | "gold" | "diamond"

export interface RewardItemData {
  id: string
  title: string
  description?: string
  status: string
  xp: number
  variant: RewardVariant
  completed: boolean
  iconUrl?: string
}

export interface RewardItemProps {
  item: RewardItemData
  style?: React.CSSProperties
}

const variantClasses = {
  bronze: {
    container: "bg-[#FFFBF3]",
    image: "/assets/icons/trophies/bronze.svg",
    title: "text-[#FFB000]",
    xp: "text-[#FFB000]",
    subtitle: "text-[#FFB000]",
  },
  silver: {
    container: "bg-[#E9EDFF]",
    image: "/assets/icons/trophies/silver.svg",
    title: "text-[#5A7BFF]",
    xp: "text-[#5A7BFF]",
    subtitle: "text-[#5A7BFF]",
  },
  gold: {
    container: "bg-[#F7F1FF]",
    image: "/assets/icons/trophies/gold.svg",
    title: "text-[#A855F7]",
    xp: "text-[#A855F7]",
    subtitle: "text-[#A855F7]",
  },
  diamond: {
    container: "bg-[#DBFFE8]",
    image: "/assets/icons/trophies/diamond.svg",
    title: "text-[#35B26B]",
    xp: "text-[#35B26B]",
    subtitle: "text-[#35B26B]",
  },
} as const

export function RewardItem({ item, style }: RewardItemProps) {
  const classes = variantClasses[item.variant]
  const iconSrc = classes.image

  return (
    <div className={`mb-3 flex items-center justify-between rounded-xl p-3 ${classes.container}`} style={style}>
      <div className="flex items-center gap-2.5">
        <img src={iconSrc} width={40} height={24} alt={`${item.title} icon`} />
        <div className="ml-1 break-words">
          <h3 className={`text-sm font-semibold ${classes.title}`}>{item.title}</h3>
          {item.description && <p className="mt-0.5 text-xs text-gray-600">{item.description}</p>}
          <p className={`text-xs ${classes.subtitle}`}>{item.status}</p>
        </div>
      </div>
    </div>
  )
}
