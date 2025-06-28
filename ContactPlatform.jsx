import { useState } from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Input } from "@/components/ui/input"; import { Textarea } from "@/components/ui/textarea"; import { Button } from "@/components/ui/button"; import { motion } from "framer-motion";

export default function ContactPlatform() { const [formData, setFormData] = useState({ name: "", email: "", message: "" }); const [status, setStatus] = useState("");

const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

const handleSubmit = async (e) => { e.preventDefault(); setStatus("جارٍ الإرسال...");

const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});

if (response.ok) {
  setStatus("✅ تم الإرسال بنجاح!");
  setFormData({ name: "", email: "", message: "" });
} else {
  setStatus("❌ حدث خطأ، حاول مرة أخرى.");
}

};

return ( <motion.div className="min-h-screen bg-gray-950 flex items-center justify-center p-4"> <Card className="w-full max-w-xl shadow-xl rounded-2xl"> <CardContent className="p-6 space-y-4"> <h2 className="text-2xl font-bold text-white">📬 تواصل معنا</h2> <form onSubmit={handleSubmit} className="space-y-4"> <Input
name="name"
placeholder="اسمك الكامل"
value={formData.name}
onChange={handleChange}
required
/> <Input
name="email"
type="email"
placeholder="البريد الإلكتروني"
value={formData.email}
onChange={handleChange}
required
/> <Textarea
name="message"
placeholder="اكتب رسالتك هنا..."
value={formData.message}
onChange={handleChange}
required
/> <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700"> إرسال </Button> </form> {status && <p className="text-sm text-white mt-2">{status}</p>} </CardContent> </Card> </motion.div> ); }

