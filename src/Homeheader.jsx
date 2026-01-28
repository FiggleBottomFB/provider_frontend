import { Outlet } from 'react-router-dom';

function HomeHeader(){
    return <div>
      <h1>HEADER MAYBE HERE</h1>
      <Outlet />
    </div>
}

export default HomeHeader