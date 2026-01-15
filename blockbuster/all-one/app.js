// Mock data array with 40 news posts
const mockPosts = [
    {
        id: 1,
        title: "Breakthrough in Quantum Computing Achieves 128-Qubit Processor",
        url: "https://quantumtech.com/breakthrough",
        domain: "quantumtech.com",
        points: 342,
        author: "quantumdev",
        time: "2 hours ago",
        comments: 127
    },
    {
        id: 2,
        title: "New JavaScript Framework Claims 10x Performance Over React",
        url: "https://devnews.io/js-framework",
        domain: "devnews.io",
        points: 278,
        author: "jsmaster",
        time: "5 hours ago",
        comments: 203
    },
    {
        id: 3,
        title: "SpaceX Successfully Lands Starship on First Attempt",
        url: "https://space-news.org/starship-landing",
        domain: "space-news.org",
        points: 512,
        author: "rocketfan",
        time: "3 hours ago",
        comments: 342
    },
    {
        id: 4,
        title: "AI System Passes Medical Licensing Exam with Top Scores",
        url: "https://ai-medicine.com/licensing-exam",
        domain: "ai-medicine.com",
        points: 198,
        author: "medtech",
        time: "7 hours ago",
        comments: 87
    },
    {
        id: 5,
        title: "Linux Kernel 6.5 Released with Major Performance Improvements",
        url: "https://kernel.org/6.5-release",
        domain: "kernel.org",
        points: 423,
        author: "linuxdev",
        time: "1 day ago",
        comments: 156
    },
    {
        id: 6,
        title: "Study Shows Remote Work Increases Productivity by 22%",
        url: "https://worktrends.com/remote-productivity",
        domain: "worktrends.com",
        points: 187,
        author: "remoteworker",
        time: "10 hours ago",
        comments: 143
    },
    {
        id: 7,
        title: "New Battery Technology Promises 1000-Mile EV Range",
        url: "https://ev-tech.com/battery-breakthrough",
        domain: "ev-tech.com",
        points: 301,
        author: "evfan",
        time: "4 hours ago",
        comments: 98
    },
    {
        id: 8,
        title: "GitHub Copilot Now Supports 10 New Programming Languages",
        url: "https://github.blog/copilot-expansion",
        domain: "github.blog",
        points: 267,
        author: "githubstaff",
        time: "6 hours ago",
        comments: 112
    },
    {
        id: 9,
        title: "Researchers Create First Programmable Quantum Computer on a Chip",
        url: "https://quantum-research.org/chip-computer",
        domain: "quantum-research.org",
        points: 389,
        author: "quantumphysicist",
        time: "1 day ago",
        comments: 76
    },
    {
        id: 10,
        title: "Apple Announces New AR Glasses for 2024",
        url: "https://apple-insider.com/ar-glasses",
        domain: "apple-insider.com",
        points: 456,
        author: "applefan",
        time: "8 hours ago",
        comments: 231
    },
    {
        id: 11,
        title: "PostgreSQL 16 Released with Enhanced Performance for Large Databases",
        url: "https://postgresql.org/version-16",
        domain: "postgresql.org",
        points: 312,
        author: "dbadmin",
        time: "12 hours ago",
        comments: 67
    },
    {
        id: 12,
        title: "Neural Network Can Now Predict Protein Structures with 99% Accuracy",
        url: "https://bio-ai.org/protein-folding",
        domain: "bio-ai.org",
        points: 276,
        author: "bioinformatician",
        time: "1 day ago",
        comments: 54
    },
    {
        id: 13,
        title: "Tesla Unveils $25,000 Electric Car with 400-Mile Range",
        url: "https://electrictransport.com/tesla-affordable",
        domain: "electrictransport.com",
        points: 521,
        author: "evnthusiast",
        time: "5 hours ago",
        comments: 287
    },
    {
        id: 14,
        title: "Web Assembly Now Runs at Near-Native Speed in All Major Browsers",
        url: "https://webdev-news.com/wasm-performance",
        domain: "webdev-news.com",
        points: 198,
        author: "wasmdev",
        time: "9 hours ago",
        comments: 73
    },
    {
        id: 15,
        title: "NASA Confirms Evidence of Ancient Microbial Life on Mars",
        url: "https://space-science.org/mars-life",
        domain: "space-science.org",
        points: 678,
        author: "astrobiologist",
        time: "3 hours ago",
        comments: 342
    },
    {
        id: 16,
        title: "TypeScript 5.2 Introduces Pattern Matching and More",
        url: "https://typescript-news.dev/5.2-release",
        domain: "typescript-news.dev",
        points: 234,
        author: "tsdev",
        time: "1 day ago",
        comments: 87
    },
    {
        id: 17,
        title: "Renewable Energy Now Cheaper Than Fossil Fuels in 90% of the World",
        url: "https://clean-energy.org/global-report",
        domain: "clean-energy.org",
        points: 412,
        author: "greentech",
        time: "7 hours ago",
        comments: 156
    },
    {
        id: 18,
        title: "New Open Source Project Aims to Replace Docker with Faster Alternative",
        url: "https://containertech.dev/new-platform",
        domain: "containertech.dev",
        points: 287,
        author: "devopseng",
        time: "11 hours ago",
        comments: 193
    },
    {
        id: 19,
        title: "Researchers Develop Brain Implant That Restores Vision to the Blind",
        url: "https://neurotech-news.com/vision-implant",
        domain: "neurotech-news.com",
        points: 345,
        author: "neuroscientist",
        time: "1 day ago",
        comments: 78
    },
    {
        id: 20,
        title: "Google's DeepMind Solves 50-Year-Old Protein Folding Problem",
        url: "https://ai-breakthroughs.com/protein-folding",
        domain: "ai-breakthroughs.com",
        points: 567,
        author: "aienthusiast",
        time: "6 hours ago",
        comments: 231
    },
    {
        id: 21,
        title: "Firefox Introduces New Privacy Features to Block Advanced Tracking",
        url: "https://mozilla.org/privacy-update",
        domain: "mozilla.org",
        points: 312,
        author: "privacyadvocate",
        time: "8 hours ago",
        comments: 97
    },
    {
        id: 22,
        title: "Startup Creates Carbon-Negative Concrete That Absorbs CO2",
        url: "https://green-construction.com/carbon-concrete",
        domain: "green-construction.com",
        points: 276,
        author: "climateinnovator",
        time: "1 day ago",
        comments: 64
    },
    {
        id: 23,
        title: "Rust Becomes Second Official Language for Linux Kernel Development",
        url: "https://rust-news.dev/linux-kernel",
        domain: "rust-news.dev",
        points: 489,
        author: "rustacean",
        time: "4 hours ago",
        comments: 217
    },
    {
        id: 24,
        title: "New Algorithm Reduces Machine Learning Training Time by 80%",
        url: "https://ml-research.org/training-speedup",
        domain: "ml-research.org",
        points: 198,
        author: "mlresearcher",
        time: "10 hours ago",
        comments: 53
    },
    {
        id: 25,
        title: "First Successful Quantum Teleportation of Complex Quantum Data",
        url: "https://quantum-physics.org/teleportation",
        domain: "quantum-physics.org",
        points: 378,
        author: "quantumscientist",
        time: "5 hours ago",
        comments: 142
    },
    {
        id: 26,
        title: "Amazon Introduces Drone Delivery Service in 50 New Cities",
        url: "https://retail-tech.com/amazon-drones",
        domain: "retail-tech.com",
        points: 234,
        author: "techretail",
        time: "1 day ago",
        comments: 187
    },
    {
        id: 27,
        title: "New CSS Framework Promises Responsive Designs with 50% Less Code",
        url: "https://frontend-news.dev/css-framework",
        domain: "frontend-news.dev",
        points: 212,
        author: "cssdev",
        time: "7 hours ago",
        comments: 96
    },
    {
        id: 28,
        title: "Researchers Create First Room-Temperature Superconductor",
        url: "https://physics-breakthrough.org/superconductor",
        domain: "physics-breakthrough.org",
        points: 587,
        author: "physicist",
        time: "2 hours ago",
        comments: 243
    },
    {
        id: 29,
        title: "Microsoft Announces Windows 12 with Built-in AI Assistant",
        url: "https://windows-news.com/windows12",
        domain: "windows-news.com",
        points: 345,
        author: "msftuser",
        time: "9 hours ago",
        comments: 278
    },
    {
        id: 30,
        title: "New Study Shows Programming in Teams of Three Most Effective",
        url: "https://dev-productivity.com/team-size",
        domain: "dev-productivity.com",
        points: 176,
        author: "teamlead",
        time: "1 day ago",
        comments: 128
    },
    {
        id: 31,
        title: "Blockchain-Based Voting System Successfully Tested in Switzerland",
        url: "https://crypto-news.org/voting-system",
        domain: "crypto-news.org",
        points: 289,
        author: "blockchaindev",
        time: "6 hours ago",
        comments: 131
    },
    {
        id: 32,
        title: "New AI Can Generate Photorealistic Images from Text in Milliseconds",
        url: "https://ai-imaging.com/text-to-image",
        domain: "ai-imaging.com",
        points: 412,
        author: "aiartist",
        time: "8 hours ago",
        comments: 96
    },
    {
        id: 33,
        title: "Study Finds 70% of Software Engineers Experience Burnout",
        url: "https://dev-health.org/burnout-study",
        domain: "dev-health.org",
        points: 376,
        author: "wellnessdev",
        time: "11 hours ago",
        comments: 243
    },
    {
        id: 34,
        title: "New Programming Language Designed Specifically for Quantum Computing",
        url: "https://quantum-dev.com/new-language",
        domain: "quantum-dev.com",
        points: 234,
        author: "qprogrammer",
        time: "1 day ago",
        comments: 87
    },
    {
        id: 35,
        title: "Researchers Develop Battery That Charges in 5 Minutes, Lasts a Week",
        url: "https://energy-tech.org/fast-battery",
        domain: "energy-tech.org",
        points: 512,
        author: "energyresearcher",
        time: "4 hours ago",
        comments: 156
    },
    {
        id: 36,
        title: "New Open Source Database Outperforms MongoDB and PostgreSQL",
        url: "https://database-news.dev/new-db",
        domain: "database-news.dev",
        points: 287,
        author: "dbdeveloper",
        time: "7 hours ago",
        comments: 193
    },
    {
        id: 37,
        title: "First Successful Brain-to-Brain Communication Achieved via Internet",
        url: "https://neurotech.org/brain-internet",
        domain: "neurotech.org",
        points: 645,
        author: "neuroscientist",
        time: "5 hours ago",
        comments: 312
    },
    {
        id: 38,
        title: "Study Shows Developers Who Use Dark Mode Code 20% Faster",
        url: "https://ui-research.com/dark-mode",
        domain: "ui-research.com",
        points: 198,
        author: "uxresearcher",
        time: "1 day ago",
        comments: 243
    },
    {
        id: 39,
        title: "New Satellite Internet Service Provides 1Gbps in Remote Areas",
        url: "https://space-internet.com/rural-service",
        domain: "space-internet.com",
        points: 312,
        author: "connectivityexpert",
        time: "8 hours ago",
        comments: 87
    },
    {
        id: 40,
        title: "Researchers Create AI That Can Debug Code Better Than Humans",
        url: "https://ai-coding.dev/debugging",
        domain: "ai-coding.dev",
        points: 456,
        author: "aidev",
        time: "3 hours ago",
        comments: 176
    }
];

// DOM elements
const postsContainer = document.getElementById('posts-container');
const moreButton = document.getElementById('more-button');

// Variables to track post display
let currentIndex = 0;
const postsPerPage = 14;

// Function to create a post element
function createPostElement(post, index) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    
    const rankElement = document.createElement('div');
    rankElement.className = 'post-rank';
    rankElement.textContent = currentIndex + index + 1 + '.';
    
    const contentElement = document.createElement('div');
    contentElement.className = 'post-content';
    
    const titleLine = document.createElement('div');
    
    const titleLink = document.createElement('a');
    titleLink.className = 'post-title';
    titleLink.href = post.url;
    titleLink.textContent = post.title;
    
    const domainSpan = document.createElement('span');
    domainSpan.className = 'post-domain';
    domainSpan.textContent = `(${post.domain})`;
    
    titleLine.appendChild(titleLink);
    titleLine.appendChild(domainSpan);
    
    const metaLine = document.createElement('div');
    metaLine.className = 'post-meta';
    metaLine.innerHTML = `${post.points} points by ${post.author} ${post.time} | <a href="#">${post.comments} comments</a>`;
    
    contentElement.appendChild(titleLine);
    contentElement.appendChild(metaLine);
    
    postElement.appendChild(rankElement);
    postElement.appendChild(contentElement);
    
    return postElement;
}

// Function to display posts
function displayPosts() {
    const endIndex = Math.min(currentIndex + postsPerPage, mockPosts.length);
    const postsToDisplay = mockPosts.slice(currentIndex, endIndex);
    
    postsToDisplay.forEach((post, index) => {
        const postElement = createPostElement(post, index);
        postsContainer.appendChild(postElement);
    });
    
    currentIndex = endIndex;
    
    // Hide the More button if all posts are displayed
    if (currentIndex >= mockPosts.length) {
        moreButton.style.display = 'none';
    }
}

// Event listener for the More button
moreButton.addEventListener('click', displayPosts);

// Initial display of posts
displayPosts();