const GoogleMap = () => {
  return (
    <div className="w-full h-96 border">
      {/* Replace the src with your own Google Maps embed link or use Google Maps API */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2117.9832748454805!2d75.35557306555503!3d19.87881735212608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdba3a0ab7088b7%3A0xb5af50109d8a8cce!2sMGM%20University!5e0!3m2!1sen!2sin!4v1730238231277!5m2!1sen!2sin"
        width="600"
        height="900"
        style={{ border: 0 }}
        allowFullScreen= {true}
        loading="lazy"
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
