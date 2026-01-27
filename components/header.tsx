"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl lg:text-2xl font-bold tracking-tight text-foreground">
            ÉLEVE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
              브랜드 소개
            </Link>
            <Link href="#story" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
              브랜드 스토리
            </Link>
            <Link href="#values" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
              핵심 가치
            </Link>
            <Link href="/faq" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
              자주 묻는 질문
            </Link>
            <Link href="#contact" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
              문의하기
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                0
              </span>
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-sm">
              쇼핑하기
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link href="#about" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
                브랜드 소개
              </Link>
              <Link href="#story" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
                브랜드 스토리
              </Link>
              <Link href="#values" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
                핵심 가치
              </Link>
              <Link href="/faq" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
                자주 묻는 질문
              </Link>
              <Link href="#contact" className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
                문의하기
              </Link>
              <Button className="w-full mt-2 bg-primary text-primary-foreground font-sans">쇼핑하기</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
