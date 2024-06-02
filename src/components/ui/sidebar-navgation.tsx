interface Props {
  children?: React.ReactNode
  name?: string
  link?: string
  target?: string
  Icon?: any
  active?: boolean
}

const SidebarNavigation = ({ Icon, name, link, target, active }: Props) => {
  return (
    <a
      href={link || '#'}
      target={target}
      className={`flex p-1 mb-3 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400  hover:text-black dark:hover:text-white place-items-center gap-1 hover:bg-neutral-700/30 transition-colors duration-100 ${active ? 'text-black dark:text-white' : 'text-neutral-400'} `}
    >
      <Icon className="min-w-8 w-8" />
      <p className="text-inherit overflow-clip whitespace-nowrap tracking-wide">{name}</p>
    </a>
  )
}

export default SidebarNavigation
