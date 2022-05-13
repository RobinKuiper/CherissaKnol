import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./Components/Sidebar";
import { About, Collabs, Contact, Home, Photos } from "./Pages";

function App() {
  const [layout, setLayout] = useState("default")

  const layoutSwitcher = () => {

    const layouts = ["default", "full", "full2", "full3"];
    const currentLayout = layouts.indexOf(layout);

    const toggleLayout = () => {
      
      const nextLayout = currentLayout === layouts.length - 1 ? 0 : currentLayout + 1;
      setLayout(layouts[nextLayout]);
    }

    return <button className='absolute bottom-0 right-0 bg-white text-black p-3' onClick={toggleLayout}>Switch Layout {currentLayout+1}/{layouts.length}</button>
  }

  if (layout === "default") {
    return (
    <div className="container mx-auto h-full">
      {layoutSwitcher()}
      <div className="flex flex-row flex-wrap py-4 h-full">

        <aside className="w-full h-full sm:w-1/3 md:w-1/4 px-2">
          <div className="w-full h-full bg-white shadow-md shadow-black">
            <Sidebar />
          </div>
        </aside>

        <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 overflow-hidden">
          <div className="ml-10 w-full h-2 bg-white shadow-lg shadow-black"></div>
          <div className="ml-10 pt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/collabs" element={<Collabs />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/photos/:category" element={<Photos layout={layout} />} />
          </Routes>
          </div>
        </main>
      </div>
    </div>
  );
  }else{
    return (
    <div className="h-full">
      {layoutSwitcher()}
      <div className="flex flex-row flex-wrap  h-full">

        <aside className={`w-full h-full sm:w-1/3 md:w-1/5 ${layout === 'full' ? '' : layout === 'full2' ? 'px-2' : 'px-5'}`}>
          <div className="top-0 w-full h-full bg-white shadow-lg shadow-black">
            <Sidebar />
          </div>
        </aside>

        <main role="main" id="content" className="w-full sm:w-2/3 md:w-4/5 pt-1 overflow-hidden">
          <div className="mx-10 w-full h-2 bg-white shadow-lg shadow-black"></div>
          <div className="mx-10 pt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/collabs" element={<Collabs />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/photos/:category" element={<Photos layout={layout} />} />
          </Routes>
          </div>
        </main>
      </div>
    </div>
  );
  }
}

export default App;
