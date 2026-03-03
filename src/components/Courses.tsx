import { useState } from 'react';
import { ChevronDown, ChevronUp, Book, GraduationCap, Award, Zap } from 'lucide-react';
import EditableText from './EditableText';

export default function Courses() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const courses = [
    {
      icon: <Book className="w-10 h-10 text-[var(--color-accent)]" />,
      titleKey: "course.1.title",
      defaultTitle: "Foundation Program – Classes 6 to 9",
      descKey: "course.1.desc",
      defaultDesc: "Strong foundations create strong board results.",
      details: (
        <div className="space-y-4">
          <p className="font-medium text-[var(--color-primary)] text-base">Our Foundation Program focuses on:</p>
          <ul className="space-y-2 md:space-y-3 text-gray-700 text-base">
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Mathematics Concept Clarity</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Science Fundamentals</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Logical Thinking & Analytical Skills</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Early Exam Preparation Skills</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Regular Assessments</li>
          </ul>
          <p className="font-medium text-[var(--color-primary)] mt-4 pt-4 border-t border-gray-100 text-base">
            This stage builds confidence and prepares students for Class 10 board success.
          </p>
        </div>
      )
    },
    {
      icon: <GraduationCap className="w-10 h-10 text-[var(--color-accent)]" />,
      titleKey: "course.2.title",
      defaultTitle: "Class 10 Board Preparation",
      subtitle: "CBSE | ICSE | IGCSE",
      descKey: "course.2.desc",
      defaultDesc: "Comprehensive board-focused preparation with structured testing.",
      details: (
        <div className="space-y-4">
          <p className="font-medium text-[var(--color-primary)] text-base">Subjects Covered:</p>
          <ul className="list-disc pl-5 text-gray-700 mb-4 space-y-2 text-base">
            <li>Mathematics</li>
            <li>Science (Physics, Chemistry, Biology)</li>
            <li>Social Science</li>
          </ul>
          <p className="font-medium text-[var(--color-primary)] text-base">What Makes Our Class 10 Program Different?</p>
          <ul className="space-y-2 md:space-y-3 text-gray-700 text-base">
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Complete Syllabus Coverage</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Step-by-Step Problem Solving</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Structured Answer Writing</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Weekly Topic-Wise Tests</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Full-Length Board Model Exams</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Detailed Feedback & Correction</li>
          </ul>
          <p className="font-medium text-[var(--color-primary)] mt-4 pt-4 border-t border-gray-100 text-base">
            We prepare students not just to pass — but to score confidently.
          </p>
        </div>
      )
    },
    {
      icon: <Award className="w-10 h-10 text-[var(--color-accent)]" />,
      titleKey: "course.3.title",
      defaultTitle: "Class 12 Board Preparation",
      subtitle: "CBSE | ICSE | IGCSE",
      descKey: "course.3.desc",
      defaultDesc: "Advanced concept mastery and board exam excellence.",
      details: (
        <div className="space-y-4">
          <p className="font-medium text-[var(--color-primary)] text-base">Subjects:</p>
          <ul className="list-disc pl-5 text-gray-700 mb-4 space-y-2 text-base">
            <li>Mathematics</li>
            <li>Physics</li>
            <li>Chemistry</li>
          </ul>
          <p className="font-medium text-[var(--color-primary)] text-base">Our approach includes:</p>
          <ul className="space-y-2 md:space-y-3 text-gray-700 text-base">
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> In-Depth Concept Teaching</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Advanced Numerical Problem Practice</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Board Pattern Question Training</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> High-Weightage Topic Focus</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Time Management Strategy</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Answer Presentation Techniques</li>
          </ul>
          <p className="font-medium text-[var(--color-primary)] mt-4 pt-4 border-t border-gray-100 text-base">
            We ensure students are fully exam-ready months before board exams.
          </p>
        </div>
      )
    },
    {
      icon: <Zap className="w-10 h-10 text-[var(--color-accent)]" />,
      titleKey: "course.4.title",
      defaultTitle: "Intensive Crash Courses",
      subtitle: "(Board-Focused)",
      descKey: "course.4.desc",
      defaultDesc: "Focused revision program for final exam preparation.",
      details: (
        <div className="space-y-4">
          <p className="font-medium text-[var(--color-primary)] text-base">Includes:</p>
          <ul className="space-y-2 md:space-y-3 text-gray-700 text-base">
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Rapid Complete Syllabus Revision</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Important Questions Compilation</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Previous Year Board Questions</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Smart Shortcuts & Time-Saving Techniques</li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-accent)]">✔</span> Focus on Frequently Asked Topics</li>
          </ul>
          <p className="font-medium text-[var(--color-primary)] mt-4 pt-4 border-t border-gray-100 text-base">
            Perfect for boosting confidence before exams.
          </p>
        </div>
      )
    }
  ];

  return (
    <section id="courses" className="py-16 md:py-20 px-5 bg-[var(--color-light)]">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-16">
          <EditableText
            contentKey="courses.title"
            defaultText="Our Academic Programs"
            as="h2"
            className="font-heading font-semibold text-2xl md:text-4xl text-[var(--color-primary)] mb-4 mt-10 leading-snug"
          />
          <EditableText
            contentKey="courses.subtitle"
            defaultText="Structured coaching designed for concept clarity and board success."
            as="p"
            className="font-body text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed"
          />
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${expandedIndex === index ? 'shadow-md ring-1 ring-[var(--color-primary)]/20' : 'hover:shadow-md'}`}
            >
              <div 
                className="p-6 cursor-pointer flex flex-col h-full"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[var(--color-light)] p-3 rounded-lg">
                    {course.icon}
                  </div>
                  <button className="text-[var(--color-primary)] p-2 hover:bg-[var(--color-light)] rounded-full transition-colors">
                    {expandedIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </button>
                </div>
                
                <EditableText
                  contentKey={course.titleKey}
                  defaultText={course.defaultTitle}
                  as="h3"
                  className="font-heading font-medium text-lg md:text-2xl text-[var(--color-primary)] mb-1 leading-snug"
                />
                {course.subtitle && (
                  <p className="font-heading font-semibold text-sm md:text-base text-[var(--color-accent)] mb-3 tracking-wider">
                    {course.subtitle}
                  </p>
                )}
                
                <EditableText
                  contentKey={course.descKey}
                  defaultText={course.defaultDesc}
                  as="p"
                  className="font-body text-base text-gray-700 mt-2 leading-relaxed"
                  multiline
                />

                {/* Expanded Content */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    expandedIndex === index ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden font-body text-base">
                    {course.details}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
