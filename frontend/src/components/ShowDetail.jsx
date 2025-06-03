import React from "react";
import FeatureDetail from "./FeatureDetail.jsx";
import {
  FaUser,
  FaPlus,
  FaEdit,
  FaPaperPlane,
  FaComments,
} from "react-icons/fa";
import { IoMdChatbubbles, IoIosAddCircleOutline } from "react-icons/io";
import { MdEdit, MdChatBubble } from "react-icons/md";
import { IoSend } from "react-icons/io5";

const ShowDetail = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeatureDetail
          number="1"
          title="Community Posts"
          description="Share and Connect Through Posts"
          features={[
            "Like & Comment: Interact with others' posts and ideas.",
            "Hashtags & Tags: Organize topics with #tags for easy discoverability.",
            "Follow System: Follow users to keep up with their latest thoughts or updates.",
            "Save & Bookmark: Bookmark insightful posts for future reference.",
            "Media Attachments: Add code snippets, images, and links to enrich your post.",
          ]}
          steps={[
            {
              label: "Open Comunity",
              icon: <IoMdChatbubbles className="w-5 h-5" />,
              description:
                "Discover the latest thoughts, kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkquestions, and ideas from developers around the world.",
              title: "Five Steps To Express and Engage",
            },
            {
              label: "Create a new Post",
              icon: <IoIosAddCircleOutline className="w-5 h-5" />,
              description: "Klik tombol 'Buat Postingan' di menu navigasi",
            },
            {
              label: "Add Content",
              icon: <MdEdit className="w-5 h-5" />,
              description: "Isi judul dan konten postingan Anda",
            },
            {
              label: "Post & Share",
              icon: <IoSend className="w-5 h-5" />,
              description: "Isi judul dan konten postingan Anda",
            },
            {
              label: "Interact With Others",
              icon: <MdChatBubble className="w-5 h-5" />,
              description: "Isi judul dan konten postingan Anda",
            },
          ]}
        >
          <p>
            Express thoughts, ask questions, or start discussions through post
            feeds designed for the developer community. Posts are real-time,
            searchable, and comment-friendly — inspired by modern social media
            but focused on tech.
          </p>
        </FeatureDetail>

        <FeatureDetail
          number="2"
          title="Tech Articles"
          description="Publish and Explore Tech Insights"
          features={[
            " Rich Markdown Editor: Supports code blocks, headers, links, and embeds.",
            "Article Categories: Browse by topics like Web Dev, AI, Mobile, DevOps, etc.",
            "Draft & Publish: Write in private drafts, publish when ready.",
            "Draft & Publish: Write in private drafts, publish when ready.",
            "Author Profiles: See all articles by a writer with their bio and expertise tags.",
          ]}
          steps={[
            {
              label: "Access the Articles",
              icon: <FaUser className="w-5 h-5" />,
              description:
                'Browse insightful tech articles or start creating your own from the "Articles" section.',
              title: "Five Steps to Write and Inspire",
            },
            {
              label: "Start Writing",
              icon: <FaPlus className="w-5 h-5" />,
              description:
                "Click “Write Article” and add a compelling title, body content, and code blocks.",
            },
            {
              label: "Format & Enhance",
              icon: <FaEdit className="w-5 h-5" />,
              description:
                "Use formatting tools to style text, add images, code, and embedded content.",
            },
            {
              label: "Preview & Publish",
              icon: <FaEdit className="w-5 h-5" />,
              description:
                "Preview your article before clicking “Publish” to ensure everything looks great.",
            },
            {
              label: "Engage with Readers",
              icon: <FaEdit className="w-5 h-5" />,
              description:
                "Receive comments, feedback, and stats about how your article is performing.",
            },
          ]}
        >
          <p>
            Write long-form content in a distraction-free markdown editor,
            perfect for sharing tutorials, case studies, or insights. Every
            article becomes part of a growing tech knowledge library curated by
            the community.
          </p>
        </FeatureDetail>

        <FeatureDetail
          number="3"
          title="Interactive Courses"
          description="Learn from the Community, Anytime"
          features={[
            "Community-Created Courses: Anyone can create and publish a course.",
            "Lesson Progress Tracker: Track completed lessons and milestones.",
            "Quiz & Assessments: Test understanding through interactive quizzes.",
            "Peer Reviews: Get feedback or rating on your published course.",
            "Certificates (Optional): Receive community-issued badges or certificates of completion.",
          ]}
          steps={[
            {
              label: "Explore Course",
              icon: <FaUser className="w-5 h-5" />,
              description: "Access the Articles ",
              title:
                "Navigate to the “Courses” section and browse topics suited to your goals.",
            },
            {
              label: "View Course Details",
              icon: <FaPlus className="w-5 h-5" />,
              description:
                "Check prerequisites, modules, and what you'll learn in each course preview.",
            },
            {
              label: "Enroll in a Course",
              icon: <FaEdit className="w-5 h-5" />,
              description: "Click “Enroll” to begin learning at your own pace.",
            },
            {
              label: "Complete Lessons",
              icon: <FaEdit className="w-5 h-5" />,
              description:
                "Follow lessons step by step, answer quizzes, and complete exercises.",
            },
            {
              label: "Earn Badge",
              icon: <FaEdit className="w-5 h-5" />,
              description:
                "Finish the course and receive a badge or certificate to showcase your skills.",
            },
          ]}
        >
          <p>
            Explore self-paced courses made by fellow developers. Whether it’s
            JavaScript basics, Docker for DevOps, or building a startup MVP —
            courses are broken into modules and include quizzes, code
            challenges, and discussion threads.
          </p>
        </FeatureDetail>

        <FeatureDetail
          number="4"
          title="Developer Communities"
          description="Find Your Tech Tribe"
          features={[
            " Open or Private Communities: Join public communities or apply for private groups.",
            "Discussion Boards & Threads: Organized forums by topic or interest.",
            "Project Collaboration Rooms: Work on shared codebases and get feedback.",
            "Community Events: Webinars, AMAs, or hackathons hosted by members.",
            "Role-based Badges: Recognize admins, moderators, and mentors.",
          ]}
          steps={[
            {
              label: "Discover Communities",
              icon: <FaUser className="w-5 h-5" />,
              description: "Visit the “Communities” page to browse topic-based groups (e.g., Web Dev, AI).",
              title:
                "Five Steps to Join and Collaborate"
            },
            {
              label: "Join a Community",
              icon: <FaPlus className="w-5 h-5" />,
              description:
                "Click “Join” to access discussions, updates, and member content.",
            },
            {
              label: "Start Engaging",
              icon: <FaEdit className="w-5 h-5" />,
              description:
                "Introduce yourself, join conversations, and react to posts within the group.",
            },
            {
              label: "Share Ideas",
              icon: <FaEdit className="w-5 h-5" />,
              description:
                "Post questions, projects, or tips and help others grow alongside you.",
            },
            {
              label: "Build & Collaborate",
              icon: <FaEdit className="w-5 h-5" />,
              description:
                "Participate in group projects, mentorship, or events organized by the community.",
            },
          ]}
        >
          <p>
            Communities in TechSera are micro-spaces for specific technologies,
            programming languages, or roles (e.g. "Frontend Devs", "Python
            Enthusiasts", "AI Builders"). Members can post, chat, and
            collaborate within focused circles.
          </p>
        </FeatureDetail>
      </div>
    </div>
  );
};

export default ShowDetail;
