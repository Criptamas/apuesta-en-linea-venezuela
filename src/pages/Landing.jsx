import { Header } from '../Header/index'
import { SearchBar } from '../SearchBar/index' 
import { Hero } from '../Hero/index'
import { ComoJugar } from '../ComoJugar/index'
// import { RecentWinners } from '../RecentWinners/index'
import { Footer } from '../Footer/index'

function Landing() {
 return(
  <div className="min-h-screen flex flex-col bg-grey w-full overflow-x-hidden">
      <Header />
    
       <main className="flex-grow w-full container mx-auto px-4">
        <SearchBar />
        <Hero />
        <ComoJugar />
        {/* <RecentWinners /> */}
      </main>

      <Footer />
    </div>
 )
}

export { Landing }