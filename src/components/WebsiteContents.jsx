import Header from "./header/Header"
import Footer from "./footer/Footer"
import './websitecomponent.css'
import { AllPost } from "./post/AllPost/AllPost"
export const WebsiteContents = () => {
  return (
    <main className="main-wrapper">
        <Header></Header>
        <AllPost></AllPost>
        <h1>THIS</h1>
        <Footer></Footer>
    </main>
  )
}
