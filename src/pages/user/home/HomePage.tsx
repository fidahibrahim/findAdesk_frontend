import  { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, MapPin } from 'lucide-react';
import Header from '@/components/user/Header';
import Footer from '@/components/user/Footer';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const spaces = [
    { title: 'Public space', image: '/user/public-space.jpg' },
    { title: 'Private space', image: '/user/private-space.jpg' },
    { title: 'Meeting room', image: '/user/meeting-room.jpg' }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === spaces.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? spaces.length - 1 : prev - 1));
  };

  return (
    <>
    <Header/>
    <div className="w-full">
      {/* Hero Section with inset banner */}
      <div className="relative h-[700px] mx-[10%] bg-gray-100">
        <div className="absolute inset-0">
          <img 
            src="/user/banner-1.jpg" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/15" /> {/* Subtle overlay */}
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-7xl font-serif -tracking-tighter text-[#20425a] mb-9">
            Find Your<br />Desk Here
          </h1>
          <button className="bg-gray-100 text-gray-800 px-8 py-3 rounded hover:bg-gray-100 transition-colors text-lg">
            Book your space
          </button>
        </div>
      </div>

      {/* Carousel Section - overlapping the hero */}
      <div className="max-w-7xl mx-auto -mt-32 bg-gray-100  rounded-xl shadow-xl p-12 relative z-50">
        <div className="relative">
          <div className="flex justify-between items-center gap-8 px-8">
            {spaces.map((space, index) => (
              <div
                key={index}
                className={`relative flex-1 transition-opacity duration-300 ${
                  Math.abs(currentSlide - index) <= 1 ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="text-center mt-4 text-gray-700 text-lg">{space.title}</p>
              </div>
            ))}
          </div>
          
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600  text-lg">Finding the ideal space is a thing of the past.</p>
          <h2 className="text-2xl font-serif">
            Welcome to a new era of productivity<br />and collaboration.
          </h2>
        </div>
      </div>

      {/* Search Section with matching height and inset */}
      <div className="relative mt-[-32px] z-10 ">
        <div className="h-[600px]  relative overflow-hidden">
          <img 
            src="/user/banner-2.jpg" 
            alt="Search background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center m z-0">
            <div className="max-w-2xl w-full px-4">
              <h2 className="text-4xl font-serif text-white text-center mb-12">
                Quickly locate your space
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center bg-white rounded-lg px-6 py-4">
                  <Search className="w-6 h-6 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Search a workspace here"
                    className="w-full bg-transparent outline-none text-lg"
                  />
                </div>
                
                <div className="flex items-center bg-white rounded-lg px-6 py-4">
                  <MapPin className="w-6 h-6 text-gray-400 mr-3" />
                  <select className="w-full bg-transparent outline-none text-lg">
                    <option value="">Select a location here</option>
                  </select>
                </div>
                
                <button className="w-full bg-gray-800 text-white py-4 rounded-lg hover:bg-gray-700 transition-colors text-lg font-medium">
                  GET STARTED
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default HomePage;