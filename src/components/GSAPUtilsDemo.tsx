import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SplitTextExample from "./SplitTextExample";
import ScrollTriggerExample from "./ScrollTriggerExample";
import AnimatedSection from "./AnimatedSection";

const GSAPUtilsDemo = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
        GSAP Animation Utilities - Ultra Edition
      </h1>

      <Tabs defaultValue="splittext" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="splittext">SplitText</TabsTrigger>
          <TabsTrigger value="splittext3d">SplitText 3D</TabsTrigger>
          <TabsTrigger value="scrolltrigger">ScrollTrigger</TabsTrigger>
          <TabsTrigger value="animated">Animated Section</TabsTrigger>
        </TabsList>

        <TabsContent value="splittext" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>SplitText Animation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="p-6 bg-gray-50 rounded-lg">
                <SplitTextExample
                  text="Prévoyance Services 3.0"
                  type="chars"
                  staggerValue={0.03}
                  color="text-[#13B88A]"
                />
                <p className="text-gray-600 mt-4">
                  This example demonstrates character-by-character animation
                  using GSAP's SplitText plugin (or a fallback for environments
                  without the plugin).
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <SplitTextExample
                  text="Des solutions d'assurance adaptées à vos besoins"
                  type="words"
                  staggerValue={0.08}
                  className="text-2xl"
                  color="text-[#2563EB]"
                />
                <p className="text-gray-600 mt-4">
                  This example shows word-by-word animation with a slower
                  stagger effect.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="splittext3d" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>SplitText 3D Animation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="p-6 bg-gradient-to-r from-[#13B88A]/10 to-[#2563EB]/10 rounded-lg">
                <SplitTextExample
                  text="Prévoyance Services 3.0"
                  type="chars"
                  staggerValue={0.03}
                  color="text-[#13B88A]"
                  is3D={true}
                />
                <p className="text-gray-600 mt-4">
                  This advanced example demonstrates 3D character animation with
                  perspective and depth using GSAP's advanced animation
                  capabilities.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-r from-[#2563EB]/10 to-[#13B88A]/10 rounded-lg">
                <SplitTextExample
                  text="Ultra GSAP Edition"
                  type="words"
                  staggerValue={0.08}
                  className="text-2xl"
                  color="text-[#2563EB]"
                  is3D={true}
                />
                <p className="text-gray-600 mt-4">
                  This example shows word-by-word 3D animation with rotation and
                  perspective.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scrolltrigger" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>ScrollTrigger Animation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-12">
                <ScrollTriggerExample />

                <div className="h-[100px]"></div>

                <ScrollTriggerExample pinned={true} scrubValue={0.5} />

                <div className="h-[500px] flex items-center justify-center bg-gray-50 rounded-lg mt-8">
                  <p className="text-gray-500 text-center">
                    Scroll back up to see the animations again
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="animated" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Animated Section Component</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-8">
                The AnimatedSection component is a reusable wrapper that
                animates its children when they enter the viewport. Scroll down
                to see each section animate in.
              </p>

              <AnimatedSection className="mb-8">
                <Card className="mb-4 border-[#13B88A]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-[#13B88A]">
                      First Animated Item
                    </h3>
                    <p>
                      This card will animate in when it enters the viewport.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection className="mb-8" delay={0.2} stagger={0.15}>
                <Card className="mb-4 border-[#2563EB]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-[#2563EB]">
                      Second Animated Item
                    </h3>
                    <p>This card has a slight delay before animating.</p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection className="mb-8" delay={0.4} stagger={0.2}>
                <Card className="mb-4 border-[#7C3AED]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-[#7C3AED]">
                      Third Animated Item
                    </h3>
                    <p>
                      This card has an even longer delay and slower stagger.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GSAPUtilsDemo;
