import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-16 lg:py-20 px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-foreground">
              ÉLEVE
            </Link>
            <p className="mt-4 font-sans text-sm text-muted-foreground leading-relaxed">
              지속 가능한 패션,
              <br />
              세련된 스타일.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-sm font-medium text-foreground mb-4">탐색</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#about" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
                  브랜드 소개
                </Link>
              </li>
              <li>
                <Link href="#story" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
                  브랜드 스토리
                </Link>
              </li>
              <li>
                <Link href="#collection" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
                  컬렉션
                </Link>
              </li>
              <li>
                <Link href="#" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
                  매장 찾기
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-sans text-sm font-medium text-foreground mb-4">고객 지원</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="#" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
                  배송 안내
                </Link>
              </li>
              <li>
                <Link href="#" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
                  교환 및 반품
                </Link>
              </li>
              <li>
                <Link href="#contact" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-sm font-medium text-foreground mb-4">연락처</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@eleve.co.kr" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
                  hello@eleve.co.kr
                </a>
              </li>
              <li>
                <a href="tel:02-1234-5678" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
                  02-1234-5678
                </a>
              </li>
              <li className="font-sans text-sm text-muted-foreground">
                서울특별시 성수동<br />
                아틀리에로 123
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-muted-foreground">
            © 2025 ÉLEVE. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="font-sans text-xs text-muted-foreground hover:text-foreground transition-colors">
              이용약관
            </Link>
            <Link href="#" className="font-sans text-xs text-muted-foreground hover:text-foreground transition-colors">
              개인정보처리방침
            </Link>
            <Link href="#" className="font-sans text-xs text-muted-foreground hover:text-foreground transition-colors">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
