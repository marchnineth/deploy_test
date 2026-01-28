function WorldMap({ onPuzzleSelect }) {
  const dinosaurs = [
    {
      id: 'tyrannosaurus',
      name: '티라노사우루스',
      position: { top: '20%', left: '15%' },
      color: 'bg-red-400',
      headColor: 'bg-red-500',
    },
    {
      id: 'triceratops',
      name: '트리케라톱스',
      position: { top: '50%', left: '50%' },
      color: 'bg-yellow-400',
      headColor: 'bg-yellow-500',
    },
    {
      id: 'brachiosaurus',
      name: '브라키오사우루스',
      position: { top: '70%', left: '75%' },
      color: 'bg-green-400',
      headColor: 'bg-green-500',
    },
    {
      id: 'test-triangle',
      name: '테스트 삼각형',
      position: { top: '30%', left: '80%' },
      color: 'bg-blue-400',
      headColor: 'bg-blue-500',
    },
  ]

  const handleDinosaurClick = (dinosaurId) => {
    onPuzzleSelect(dinosaurId)
  }

  return (
    <div className="w-full h-full bg-gradient-to-b from-green-100 via-green-200 to-green-300 relative overflow-hidden">
      {/* 지도 느낌의 배경 패턴 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-green-400 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-4 border-green-400 rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-28 h-28 border-4 border-green-400 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 border-4 border-green-400 rounded-full"></div>
      </div>

      {/* 제목 */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-5xl font-bold text-green-800 drop-shadow-lg">
          공룡 세계 지도
        </h1>
      </div>

      {/* 공룡들 */}
      {dinosaurs.map((dino) => (
        <div
          key={dino.id}
          className="absolute cursor-pointer group"
          style={{
            top: dino.position.top,
            left: dino.position.left,
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => handleDinosaurClick(dino.id)}
        >
          {/* 말풍선 */}
          <div className="relative mb-4">
            <div className="bg-white rounded-3xl px-6 py-4 shadow-2xl border-4 border-green-600 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-2">
              <p className="text-2xl font-bold text-green-800 whitespace-nowrap">
                {dino.name}
              </p>
            </div>
            {/* 말풍선 꼬리 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[30px] border-l-transparent border-r-transparent border-t-white"></div>
            </div>
          </div>

          {/* 공룡 아이콘 */}
          <div className="flex justify-center transform transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-6">
            {dino.id === 'tyrannosaurus' && (
              <div className="relative">
                {/* 티라노사우루스 */}
                <div className={`w-32 h-32 ${dino.color} rounded-full relative`}>
                  {/* 머리 */}
                  <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 ${dino.headColor} rounded-full`}>
                    {/* 눈 */}
                    <div className="absolute top-4 left-4 w-4 h-4 bg-white rounded-full">
                      <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-black rounded-full"></div>
                    </div>
                    <div className="absolute top-4 right-4 w-4 h-4 bg-white rounded-full">
                      <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-black rounded-full"></div>
                    </div>
                    {/* 입 */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-red-600 rounded-b-full"></div>
                    {/* 이빨 */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
                      <div className="w-1 h-3 bg-white"></div>
                    </div>
                  </div>
                  {/* 팔 (작은) */}
                  <div className={`absolute top-8 left-2 w-6 h-12 ${dino.headColor} rounded-full transform rotate-45`}></div>
                  <div className={`absolute top-8 right-2 w-6 h-12 ${dino.headColor} rounded-full transform -rotate-45`}></div>
                  {/* 다리 */}
                  <div className={`absolute bottom-0 left-6 w-10 h-16 ${dino.headColor} rounded-full`}></div>
                  <div className={`absolute bottom-0 right-6 w-10 h-16 ${dino.headColor} rounded-full`}></div>
                  {/* 꼬리 */}
                  <div className={`absolute top-1/2 -right-8 w-16 h-8 ${dino.headColor} rounded-full transform rotate-12`}></div>
                </div>
              </div>
            )}

            {dino.id === 'triceratops' && (
              <div className="relative">
                {/* 트리케라톱스 */}
                <div className={`w-32 h-32 ${dino.color} rounded-full relative`}>
                  {/* 뿔 3개 */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-3 h-12 bg-yellow-600 rounded-full transform rotate-12"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-12 bg-yellow-600 rounded-full"></div>
                    <div className="absolute top-0 right-0 w-3 h-12 bg-yellow-600 rounded-full transform -rotate-12"></div>
                  </div>
                  {/* 머리 */}
                  <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-20 ${dino.headColor} rounded-full`}>
                    {/* 눈 */}
                    <div className="absolute top-6 left-6 w-4 h-4 bg-white rounded-full">
                      <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-black rounded-full"></div>
                    </div>
                    <div className="absolute top-6 right-6 w-4 h-4 bg-white rounded-full">
                      <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-black rounded-full"></div>
                    </div>
                    {/* 입 */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-yellow-600 rounded-b-full"></div>
                  </div>
                  {/* 다리 */}
                  <div className={`absolute bottom-0 left-6 w-10 h-16 ${dino.headColor} rounded-full`}></div>
                  <div className={`absolute bottom-0 right-6 w-10 h-16 ${dino.headColor} rounded-full`}></div>
                  {/* 꼬리 */}
                  <div className={`absolute top-1/2 -right-8 w-16 h-8 ${dino.headColor} rounded-full transform rotate-12`}></div>
                </div>
              </div>
            )}

            {dino.id === 'brachiosaurus' && (
              <div className="relative">
                {/* 브라키오사우루스 */}
                <div className={`w-24 h-40 ${dino.color} rounded-full relative`}>
                  {/* 긴 목 */}
                  <div className={`absolute -top-16 left-1/2 transform -translate-x-1/2 w-16 h-32 ${dino.headColor} rounded-full`}>
                    {/* 머리 */}
                    <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-20 h-16 ${dino.headColor} rounded-full`}>
                      {/* 눈 */}
                      <div className="absolute top-4 left-4 w-3 h-3 bg-white rounded-full">
                        <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-black rounded-full"></div>
                      </div>
                      <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full">
                        <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-black rounded-full"></div>
                      </div>
                      {/* 입 */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-green-600 rounded-b-full"></div>
                    </div>
                  </div>
                  {/* 몸체 */}
                  <div className={`w-24 h-32 ${dino.color} rounded-full`}></div>
                  {/* 다리 */}
                  <div className={`absolute bottom-0 left-2 w-8 h-20 ${dino.headColor} rounded-full`}></div>
                  <div className={`absolute bottom-0 right-2 w-8 h-20 ${dino.headColor} rounded-full`}></div>
                  {/* 꼬리 */}
                  <div className={`absolute top-1/2 -right-6 w-12 h-6 ${dino.headColor} rounded-full transform rotate-12`}></div>
                </div>
              </div>
            )}

            {dino.id === 'test-triangle' && (
              <div className="relative">
                {/* 테스트 삼각형 아이콘 */}
                <div className="w-32 h-32 relative transform transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-6">
                  <svg
                    width="128"
                    height="128"
                    viewBox="0 0 128 128"
                    className="w-full h-full"
                  >
                    <defs>
                      <linearGradient id="triangleGradIcon" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="64,20 20,108 108,108"
                      fill="url(#triangleGradIcon)"
                      stroke="#1e40af"
                      strokeWidth="4"
                    />
                    <text
                      x="64"
                      y="70"
                      textAnchor="middle"
                      fill="white"
                      fontSize="20"
                      fontWeight="bold"
                    >
                      테스트
                    </text>
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* 클릭 힌트 */}
          <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-lg font-bold text-green-700">클릭하세요!</p>
          </div>
        </div>
      ))}

      {/* 배경 장식 요소들 */}
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-green-400 rounded-full opacity-30"></div>
      <div className="absolute top-1/3 right-10 w-12 h-12 bg-green-400 rounded-full opacity-30"></div>
      <div className="absolute bottom-1/3 left-1/4 w-10 h-10 bg-green-400 rounded-full opacity-30"></div>
    </div>
  )
}

export default WorldMap
