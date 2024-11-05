const ImportantLinks = () => {
  const links = [
    {
      href: "/department/robotics-and-artificial-intelligence#Department Overview",
      text: "Robotics and Artificial Intelligence",
    },
    {
      href: "/department/mechanical-and-mechatronics-engineering-additive-manufacturing#Department Overview",
      text: "Mechanical and Mechatronics Engineering (Additive Manufacturing)",
    },
    {
      href: "/department/mechanical-engineering#Department Overview",
      text: "Mechanical Engineering",
    },
    {
      href: "/department/electronics-and-computer-engineering#Department Overview",
      text: "Electronics and Computer Engineering",
    },
    {
      href: "/department/electrical-and-computer-engineering#Department Overview",
      text: "Electrical and Computer Engineering",
    },
    {
      href: "/department/computer-science-and-engineering#Department Overview",
      text: "Computer Science and Engineering",
    },
    {
      href: "/department/civil-engineering-construction-technology#Department Overview",
      text: "Civil Engineering (Construction Technology)",
    },
    {
      href: "/department/civil-engineering#Department Overview",
      text: "Civil Engineering",
    },
    {
      href: "/department/chemical-engineering#Department Overview",
      text: "Chemical Engineering",
    },
    {
      href: "/department/artificial-intelligence-and-data-science#Department Overview",
      text: "Artificial Intelligence and Data Science",
    },
    {
      href: "/department/architecture#Department Overview",
      text: "Architecture",
    },
  ];

  return (
    <div className="flex flex-col space-y-1 text-xs">
      <p className="font-semibold text-2xl mb-2">UG Programs</p>
      {links.map((link, index) => (
        <div
          className="p-1 hover:scale-105 transition duration-200"
          key={index}
        >
          <a
            href={"https://www.jnec.org" + link.href}
            target="_blank"
            className="border-l-4 border-secondaryDark pl-2 p-1 text-[0.9rem] text-ellipsis text-nowrap"
          >
            {link.text}
          </a>
        </div>
      ))}
    </div>
  );
};

export default ImportantLinks;
