import { Outlet } from "react-router-dom"
import Footer from "components/layout-components/Footer"

export default function AppLayout() {

  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}