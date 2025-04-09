
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  domain: z.string().min(1, "Please select a domain of interest"),
  skills: z.string().min(3, "Please enter at least one skill"),
  workplacePreference: z.enum(["remote", "hybrid", "onsite"]),
  salaryExpectation: z.number().min(0),
  desiredPosition: z.string().min(1, "Please enter your desired position"),
});

const Interests = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [salaryValue, setSalaryValue] = useState(60000);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: "",
      skills: "",
      workplacePreference: "hybrid",
      salaryExpectation: 60000,
      desiredPosition: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Store user preferences in localStorage
    localStorage.setItem("userInterests", JSON.stringify(values));

    // Show success toast
    toast({
      title: "Preferences saved",
      description: "We've saved your career preferences",
    });

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-sky-100 p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Tell Us About Your Career Interests</h1>
        <p className="text-center text-gray-600 mb-6">
          Help us personalize your career path by sharing some information about your interests and goals
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain of Interest</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Web Development, Data Science, Marketing" {...field} />
                  </FormControl>
                  <FormDescription>
                    The primary field you're interested in pursuing
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Skills</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Python, JavaScript, Data Analysis, Communication, Project Management"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    List your skills separated by commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workplacePreference"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Workplace Preference</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="remote" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Remote
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="hybrid" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Hybrid
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="onsite" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          On-site
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salaryExpectation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Expectation ($ per year)</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <Slider
                        min={20000}
                        max={200000}
                        step={5000}
                        value={[salaryValue]}
                        onValueChange={(values) => {
                          const value = values[0];
                          setSalaryValue(value);
                          field.onChange(value);
                        }}
                      />
                      <div className="text-center text-lg font-medium">
                        ${salaryValue.toLocaleString()}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desiredPosition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Position</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Senior Developer, Data Scientist, Product Manager" {...field} />
                  </FormControl>
                  <FormDescription>
                    The job title you're aiming for
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Save Preferences</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Interests;
