import '../../styles/home.css'
import { HomeHeader } from './HomeHeader'
import { HomeCategories } from './HomeCategories'
import { TopBusinesses } from './TopBusinesses'

export const Home = () => {
    return (
        <div>
            <HomeHeader />
            <HomeCategories />
            <TopBusinesses />
        </div>
    )
}