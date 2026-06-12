import type { SocialNetwork } from "../types"

interface DevTreeLinkProps{
    link: SocialNetwork
}

export const DevTreeLink = ({link}: DevTreeLinkProps) => {
  return (
    <li className="bg-white px-5 py-5 flex items-center gap-5 rounded-lg">        
        <div className="w-5 h-5 bg-cover shrink-0"
            style={{backgroundImage: `url('/social/icon_${link.name}.svg')`}}>
        </div>
        <p className="capitalize">
            Visit my: <span className="font-black">{link.name}</span>
        </p>
    </li>
  )
}
