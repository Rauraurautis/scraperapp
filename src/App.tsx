import { RouterProvider } from 'react-router-dom';
import { router } from './lib/routes';



function App() {



  return (
    <div className="overflow-clip">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
