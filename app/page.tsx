"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertCircle, ArrowRight, Clock, Github, Loader2, Percent, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import Link from "next/link"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const slideLeft = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

const slideRight = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

// Developer data
const developers = [
  {
    name: "Aarish Garg",
    role: "ML Model Developer",
    description: "Developed the machine learning model, focusing on data preprocessing and model training.",
    bio: "3rd-year IT student at UIET PU with a passion for machine learning and software development.",
  },
  {
    name: "Lakhan Vashney",
    role: "Feature Engineer",
    description: "Contributed to model development and feature engineering.",
    bio: "3rd-year IT student at UIET PU with a passion for machine learning and software development.",
  },
  {
    name: "John",
    role: "Full-Stack Developer",
    description: "Fixed bugs, built the website and mobile app, and handled frontend-backend integration.",
    bio: "3rd-year IT student at UIET PU with a passion for machine learning and software development.",
  },
  {
    name: "Ankush",
    role: "DevOps Engineer",
    description: "Deployed the model on Render for scalable API access.",
    bio: "3rd-year IT student at UIET PU with a passion for machine learning and software development.",
  },
]

// Form interface
interface FormData {
  Player_Age: number | null
  Player_Weight: number | null
  Player_Height: number | null
  Previous_Injuries: number | null
  Training_Intensity: string
}

// Response interface
interface PredictionResponse {
  likelihood_of_injury: string
  recovery_time_days: number
}

export default function Home() {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    Player_Age: null,
    Player_Weight: null,
    Player_Height: null,
    Previous_Injuries: null,
    Training_Intensity: "",
  })

  // UI states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null)
  const [formVisible, setFormVisible] = useState(false)

  // Form validation
  const isFormValid = () => {
    return (
      formData.Player_Age !== null &&
      formData.Player_Weight !== null &&
      formData.Player_Height !== null &&
      (formData.Previous_Injuries === 0 || formData.Previous_Injuries === 1) &&
      ["Low", "Medium", "High"].includes(formData.Training_Intensity)
    )
  }

  // Handle form input changes
  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "Training_Intensity" ? value : Number(value),
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid()) {
      setError("Please fill all fields with valid values.")
      return
    }

    setLoading(true)
    setError(null)
    setPrediction(null)

    try {
      console.log("Submitting form data:", formData)
      const response = await fetch("http://192.168.18.15:3000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      setPrediction(data)
    } catch (err) {
      setError(`Failed to get prediction: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  // Scroll to form
  const scrollToForm = () => {
    setFormVisible(true)
    document.getElementById("prediction-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Sports injury background"
            fill
            className="object-cover opacity-20 blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/30 to-sky-700/30" />
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-sky-900 tracking-tight">InjuryPredictionML</h1>
            <p className="text-xl md:text-2xl font-medium text-sky-800 max-w-3xl mx-auto">
              Predict Sports Injuries with Machine Learning – A 6th Semester Project by UIET PU Students
            </p>
            <p className="text-lg text-sky-700 max-w-2xl mx-auto">
              Enter player details to predict injury likelihood and recovery time using our advanced ML model.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={scrollToForm}
                size="lg"
                className="mt-8 bg-sky-600 hover:bg-sky-700 text-white font-medium px-8 py-6 rounded-full"
              >
                Predict Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideRight}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-6">About InjuryPredictionML</h2>
            <p className="text-lg text-gray-700 mb-8">
              InjuryPredictionML is a machine learning project developed by 3rd-year IT students at UIET PU. The model
              predicts the likelihood of sports injuries and recovery time based on inputs like age, weight, height,
              previous injuries, and training intensity. Built with Python, Scikit-learn, and Flask, this 6th-semester
              project showcases our passion for coding and sports analytics.
            </p>
            <Link href="https://github.com/johnkhore5911/InjuryPredictionML" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-sky-600 text-sky-600 hover:bg-sky-50">
                <Github className="mr-2 h-5 w-5" /> View on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Prediction Form Section */}
      <section id="prediction-form" className="py-20 bg-sky-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideUp}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-10 text-center">Make a Prediction</h2>

            <Card className="shadow-lg border-sky-100">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                        Player Age
                      </label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="e.g., 24"
                        aria-label="Player Age"
                        onChange={(e) => handleInputChange("Player_Age", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                        Player Weight (kg)
                      </label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.01"
                        placeholder="e.g., 66.25"
                        aria-label="Player Weight"
                        onChange={(e) => handleInputChange("Player_Weight", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                        Player Height (cm)
                      </label>
                      <Input
                        id="height"
                        type="number"
                        step="0.01"
                        placeholder="e.g., 175.73"
                        aria-label="Player Height"
                        onChange={(e) => handleInputChange("Player_Height", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="injuries" className="block text-sm font-medium text-gray-700 mb-1">
                        Previous Injuries (0 or 1)
                      </label>
                      <Select onValueChange={(value) => handleInputChange("Previous_Injuries", value)}>
                        <SelectTrigger aria-label="Previous Injuries">
                          <SelectValue placeholder="Select 0 or 1" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0 (No)</SelectItem>
                          <SelectItem value="1">1 (Yes)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="intensity" className="block text-sm font-medium text-gray-700 mb-1">
                        Training Intensity
                      </label>
                      <Select onValueChange={(value) => handleInputChange("Training_Intensity", value)}>
                        <SelectTrigger aria-label="Training Intensity">
                          <SelectValue placeholder="Select intensity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-700"
                    disabled={loading || !isFormValid()}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                      </>
                    ) : (
                      "Predict"
                    )}
                  </Button>
                </form>

                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                {prediction && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-sky-50 rounded-lg border border-sky-100"
                  >
                    <h3 className="text-xl font-semibold text-sky-900 mb-4">Prediction Results</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="bg-sky-100 p-2 rounded-full mr-4">
                          <Percent className="h-6 w-6 text-sky-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Likelihood of Injury</p>
                          <p className="text-lg font-medium text-gray-900">
                            {prediction.likelihood_of_injury === "No" ? "Low Risk" : "High Risk"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-sky-100 p-2 rounded-full mr-4">
                          <Clock className="h-6 w-6 text-sky-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Estimated Recovery Time</p>
                          <p className="text-lg font-medium text-gray-900">
                            {prediction.recovery_time_days.toFixed(1)} days
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">Meet the Team</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Developed by 3rd-year IT students at UIET PU, passionate about coding, machine learning, and sports
              analytics. This is our 6th-semester project.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developers.map((dev, index) => (
              <motion.div
                key={dev.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={slideUp}
                custom={index}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Card className="h-full shadow-md hover:shadow-xl transition-shadow duration-300 border-sky-100">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4 mx-auto bg-sky-100 rounded-full p-4 w-24 h-24 flex items-center justify-center">
                      <User className="h-12 w-12 text-sky-600" />
                    </div>
                    <h3 className="text-xl font-bold text-sky-900 mb-1">{dev.name}</h3>
                    <p className="text-sky-600 font-medium mb-3">{dev.role}</p>
                    <p className="text-gray-600 mb-4 flex-grow">{dev.description}</p>
                    <p className="text-sm text-gray-500 italic">{dev.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="bg-sky-900 text-white py-10"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2025 InjuryPredictionML | 6th Semester Project by UIET PU Students</p>
          <div className="flex justify-center items-center">
            <Link
              href="https://github.com/johnkhore5911/InjuryPredictionML"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sky-200 hover:text-white transition-colors"
            >
              <Github className="h-4 w-4 mr-1" /> InjuryPredictionML
            </Link>
          </div>
        </div>
      </motion.footer>
    </main>
  )
}
