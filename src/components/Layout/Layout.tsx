import { Header } from './Header/Header'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="pt-4">{children}</main>
    </div>
  )
}
