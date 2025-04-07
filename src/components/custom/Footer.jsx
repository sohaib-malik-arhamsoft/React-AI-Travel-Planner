import React from 'react';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white/80 py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <a href="/" className="text-2xl font-bold text-white flex items-center mb-4">
              <span className="bg-primary text-white rounded-md px-2 py-1 mr-1">SR</span>
              ScenicRoute
            </a>
            <p className="mb-6">
              Discover and plan the perfect road trips across America with our curated routes and expert guides.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full text-white/80 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white/80 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white/80 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white/80 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Destinations</h3>
            <ul className="space-y-2">
              <li><Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">National Parks</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Coastal Drives</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Mountain Routes</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Historic Trails</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Hidden Gems</Button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Trip Planner</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Travel Guides</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Road Trip Tips</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Packing Lists</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Seasonal Guides</Button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">About Us</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Our Team</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Careers</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Press Kit</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Contact Us</Button></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/60 mb-4 md:mb-0">
            © {new Date().getFullYear()} ScenicRoute. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            <Button variant="link" className="p-0 h-auto text-white/60 hover:text-white">Privacy Policy</Button>
            <Button variant="link" className="p-0 h-auto text-white/60 hover:text-white">Terms of Service</Button>
            <Button variant="link" className="p-0 h-auto text-white/60 hover:text-white">Cookie Policy</Button>
            <Button variant="link" className="p-0 h-auto text-white/60 hover:text-white">Sitemap</Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;