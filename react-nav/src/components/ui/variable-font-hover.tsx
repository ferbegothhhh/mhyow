"use client"

import { type MotionProps } from "motion/react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { useRef } from "react"

import { useMousePositionRef } from "@/hooks/use-mouse-position-ref"

interface VariableFontHoverProps extends Omit<MotionProps, "ref"> {
  /** Class CSS yang diterapkan ke teks */
  className?: string
  /** Teks yang ditampilkan */
  label: string
  /** Jarak dari pusat teks ke posisi mouse yang memicu animasi */
  proximityThreshold?: number
  /** Font variation settings awal */
  fromFontVariationSettings?: string
  /** Font variation settings saat di-hover */
  toFontVariationSettings?: string
  /** Durasi animasi dalam detik */
  duration?: number
  /** Durasi stagger antar karakter */
  staggerDuration?: number
  /** Waktu tunggu sebelum animasi hover dimulai */
  delayChildren?: number
  /** Mulai stagger dari "start", "end", atau "center" */
  staggerFrom?: "start" | "end" | "center"
  /** Offset animasi relatif terhadap posisi mouse, sumbu X */
  offsetX?: number
  /** Offset animasi relatif terhadap posisi mouse, sumbu Y */
  offsetY?: number
}

function VariableFontHover({
  label,
  proximityThreshold = 300,
  fromFontVariationSettings = "'wght' 200",
  toFontVariationSettings = "'wght' 800",
  duration = 0.5,
  staggerDuration = 0.03,
  delayChildren = 0,
  staggerFrom = "center",
  offsetX = 0,
  offsetY = 0,
  className,
  ...props
}: VariableFontHoverProps) {
  const ref = useRef<HTMLSpanElement>(null)

  // Posisi mouse global (viewport), di-update lewat event listener window.
  const mousePositionRef = useMousePositionRef()

  const motionValueX = useMotionValue(0)
  const motionValueY = useMotionValue(0)

  const springX = useSpring(motionValueX, {
    stiffness: 150,
    damping: 30,
    mass: 0.5,
  })
  const springY = useSpring(motionValueY, {
    stiffness: 150,
    damping: 30,
    mass: 0.5,
  })

  const transformX = useTransform(
    springX,
    [-proximityThreshold / 2, proximityThreshold / 2],
    [offsetX - 1, offsetX + 1],
  )
  const transformY = useTransform(
    springY,
    [-proximityThreshold / 2, proximityThreshold / 2],
    [offsetY - 1, offsetY + 1],
  )

  function handleMouseMove() {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const elementCenterX = rect.left + rect.width / 2
    const elementCenterY = rect.top + rect.height / 2

    const dx = mousePositionRef.current.x - elementCenterX
    const dy = mousePositionRef.current.y - elementCenterY
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance <= proximityThreshold) {
      motionValueX.set(dx)
      motionValueY.set(dy)
    } else {
      motionValueX.set(0)
      motionValueY.set(0)
    }
  }

  function handleMouseLeave() {
    motionValueX.set(0)
    motionValueY.set(0)
  }

  const centerIndex = (label.length - 1) / 2

  function getDelay(index: number) {
    if (staggerFrom === "start") return index * staggerDuration
    if (staggerFrom === "end") return (label.length - 1 - index) * staggerDuration
    return Math.abs(index - centerIndex) * staggerDuration
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        x: transformX,
        y: transformY,
        display: "inline-block",
      }}
      variants={{
        rest: {
          fontVariationSettings: fromFontVariationSettings,
        },
        hover: {
          fontVariationSettings: toFontVariationSettings,
          transition: {
            duration,
          },
        },
      }}
      initial="rest"
      whileHover="hover"
      {...props}
    >
      {label.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            rest: {
              fontVariationSettings: fromFontVariationSettings,
              transition: { duration },
            },
            hover: {
              fontVariationSettings: toFontVariationSettings,
              transition: {
                duration,
                delay: delayChildren + getDelay(index),
              },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export { VariableFontHover }