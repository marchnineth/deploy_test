function Intro({ onStart }) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-400 via-blue-300 to-green-300 relative overflow-hidden">
      {/* 공룡 일러스트 배경 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* 큰 공룡 일러스트 */}
        <div className="relative">
          {/* 공룡 몸체 */}
          <div className="w-64 h-64 bg-green-400 rounded-full relative">
            {/* 공룡 머리 */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-green-500 rounded-full">
              {/* 눈 */}
              <div className="absolute top-6 left-6 w-6 h-6 bg-white rounded-full">
                <div className="absolute top-1 left-1 w-3 h-3 bg-black rounded-full"></div>
              </div>
              <div className="absolute top-6 right-6 w-6 h-6 bg-white rounded-full">
                <div className="absolute top-1 left-1 w-3 h-3 bg-black rounded-full"></div>
              </div>
              {/* 입 */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-red-400 rounded-b-full"></div>
            </div>
            {/* 다리 */}
            <div className="absolute bottom-0 left-8 w-12 h-16 bg-green-500 rounded-full"></div>
            <div className="absolute bottom-0 right-8 w-12 h-16 bg-green-500 rounded-full"></div>
            {/* 꼬리 */}
            <div className="absolute top-1/2 -right-12 w-20 h-12 bg-green-500 rounded-full transform rotate-12"></div>
          </div>
        </div>
      </div>

      {/* 작은 공룡들 배경 장식 */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-yellow-300 rounded-full opacity-60">
        <div className="absolute top-2 left-2 w-3 h-3 bg-black rounded-full"></div>
        <div className="absolute top-2 right-2 w-3 h-3 bg-black rounded-full"></div>
      </div>
      <div className="absolute bottom-32 right-32 w-20 h-20 bg-orange-300 rounded-full opacity-60">
        <div className="absolute top-3 left-3 w-3 h-3 bg-black rounded-full"></div>
        <div className="absolute top-3 right-3 w-3 h-3 bg-black rounded-full"></div>
      </div>
      <div className="absolute top-1/3 right-20 w-14 h-14 bg-pink-300 rounded-full opacity-60">
        <div className="absolute top-2 left-2 w-2 h-2 bg-black rounded-full"></div>
        <div className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full"></div>
      </div>

      {/* 구름 장식 */}
      <div className="absolute top-10 left-1/4 w-24 h-16 bg-white opacity-70 rounded-full"></div>
      <div className="absolute top-16 left-1/3 w-20 h-14 bg-white opacity-70 rounded-full"></div>
      <div className="absolute top-24 right-1/4 w-28 h-18 bg-white opacity-70 rounded-full"></div>

      {/* 시작하기 버튼 */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <button
          onClick={onStart}
          className="bg-yellow-400 hover:bg-yellow-500 text-4xl font-bold text-white px-16 py-8 rounded-full shadow-2xl transform transition-all duration-200 hover:scale-110 active:scale-95 border-4 border-yellow-600"
          style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          시작하기
        </button>
      </div>
    </div>
  )
}

export default Intro
