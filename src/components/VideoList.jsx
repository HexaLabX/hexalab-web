import { useContext, useState, useRef } from "react";
import ThemeContext from "../context/ThemeContext";

const VideoList = () => {
  const { darkMode } = useContext(ThemeContext);

  const [menus, setMenus] = useState({
    HexaLabCommunity: true,
    HexaLabProfessional: true,
  });
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(true); // State untuk visibility HexaLab Menu
  const videoRefs = useRef({});

  const menuItems = {
    HexaLabCommunity: {
      DemoInstalasi: [
        { id: 1, title: "Instalasi Tools A", src: "/videos/test.mkv" },
        { id: 2, title: "Instalasi Tools B", src: "/videos/instalasi_b.mp4" },
      ],
      PenggunaanTools: [
        { id: 3, title: "Penggunaan Tools A", src: "/videos/test.mp4" },
        { id: 4, title: "Penggunaan Tools B", src: "/videos/penggunaan_b.mp4" },
      ],
    },
    HexaLabProfessional: {
      AdvancedConfiguration: [
        { id: 5, title: "Konfigurasi Lanjutan A", src: "/videos/test.mp4" },
        { id: 6, title: "Konfigurasi Lanjutan B", src: "/videos/konfigurasi_b.mp4" },
      ],
      PerformanceOptimization: [
        { id: 7, title: "Optimasi Performa A", src: "/videos/test.mp4" },
        { id: 8, title: "Optimasi Performa B", src: "/videos/optimasi_b.mp4" },
      ],
    },
  };

  const selectedVideos =
    activeMenu && activeSubmenu ? menuItems[activeMenu][activeSubmenu] : [];

  const toggleMenu = (menu) => {
    setMenus((prevMenus) => ({
      ...prevMenus,
      [menu]: !prevMenus[menu],
    }));
  };

  const selectSubmenu = (menu, submenu) => {
    setActiveMenu(menu);
    setActiveSubmenu(submenu);
  };

  const toggleMenuVisibility = () => {
    setIsMenuVisible((prev) => !prev); // Toggle menu visibility
  };

  const handlePlayPause = (id) => {
    const currentVideo = videoRefs.current[id];
    if (!currentVideo) return;

    if (activeVideoId === id) {
      currentVideo.pause();
      setActiveVideoId(null);
    } else {
      if (activeVideoId !== null) {
        const activeVideo = videoRefs.current[activeVideoId];
        if (activeVideo) activeVideo.pause();
      }
      currentVideo.play();
      setActiveVideoId(id);
    }
  };

  const handleFullscreen = (id) => {
    const currentVideo = videoRefs.current[id];
    if (currentVideo) {
      if (currentVideo.requestFullscreen) {
        currentVideo.requestFullscreen();
      } else if (currentVideo.webkitRequestFullscreen) {
        currentVideo.webkitRequestFullscreen();
      } else if (currentVideo.mozRequestFullScreen) {
        currentVideo.mozRequestFullScreen();
      } else if (currentVideo.msRequestFullscreen) {
        currentVideo.msRequestFullscreen();
      }
    }
  };

  const handleVideoEnd = () => setActiveVideoId(null);

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      {/* Toggle Menu Button (Only Visible on Mobile) */}
      <button
        className={`fixed bottom-4 left-4 z-20 md:hidden p-2 w-12 h-12 rounded-lg shadow-lg flex justify-center items-center ${
          darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-800"
        }`}
        onClick={toggleMenuVisibility}
      >
        <span className="material-icons text-xl">
          {isMenuVisible ? "menu_open" : "menu"}
        </span>
      </button>

      {/* Sidebar */}
      {isMenuVisible && (
        <div
          className={`fixed top-16 left-0 w-64 h-[calc(100vh-64px)] p-4 overflow-y-auto z-10 transition-transform duration-300 ${
            darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
          }`}
        >
          <h2 className="text-xl font-bold mb-4">HexaLab Menu</h2>
          <ul className="space-y-4">
            {Object.keys(menuItems).map((menu) => (
              <li key={menu}>
                <button
                  onClick={() => toggleMenu(menu)}
                  className={`w-full flex justify-between items-center px-4 py-2 rounded-lg transition ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {menu}
                  <span className="material-icons">
                    {menus[menu] ? "expand_less" : "expand_more"}
                  </span>
                </button>
                {menus[menu] && (
                  <ul className="mt-2 pl-4 space-y-2">
                    {Object.keys(menuItems[menu]).map((submenu) => (
                      <li key={submenu}>
                        <button
                          onClick={() => selectSubmenu(menu, submenu)}
                          className={`w-full text-left px-2 py-1 rounded-lg transition ${
                            darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
                          } ${
                            activeMenu === menu && activeSubmenu === submenu
                              ? "bg-blue-500 text-white"
                              : ""
                          }`}
                        >
                          {submenu.replace(/([A-Z])/g, " $1")}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Video Content */}
      <div
        className={`flex-grow p-6 ${isMenuVisible ? "ml-64" : "ml-0"} ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6">
          {activeSubmenu
            ? activeSubmenu.replace(/([A-Z])/g, " $1").trim()
            : "Welcome to HexaLab"}
        </h1>
        {!activeSubmenu ? (
          <p className="text-lg">
            Explore video tutorials by selecting a category from the menu.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {selectedVideos.map((video) => (
              <div
                key={video.id}
                className={`relative rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105 ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                }`}
              >
                <video
                  ref={(ref) => (videoRefs.current[video.id] = ref)}
                  className="w-full h-40 object-cover rounded-t-lg"
                  src={video.src}
                  onEnded={handleVideoEnd}
                />
                <div className="p-4 flex justify-between items-center">
                  <h2 className="font-semibold">{video.title}</h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePlayPause(video.id)}
                      className={`text-blue-500 hover:text-blue-700 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      <span className="material-icons">
                        {activeVideoId === video.id ? "pause" : "play_arrow"}
                      </span>
                    </button>
                    <button
                      onClick={() => handleFullscreen(video.id)}
                      className={`text-green-500 hover:text-green-700 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      <span className="material-icons">fullscreen</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoList;
