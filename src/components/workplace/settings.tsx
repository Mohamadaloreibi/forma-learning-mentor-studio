import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PageHeading } from "./shell";
import { useWorkplace } from "./context";
export function SettingsPage() {
  const { profile, setProfile, preferences, setPreferences } = useWorkplace();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);
  const [learning, setLearning] = useState(preferences.learning);
  const [notifications, setNotifications] = useState(preferences.notifications);
  const [team, setTeam] = useState(preferences.team);
  return (
    <div className="content-enter">
      <PageHeading
        eyebrow="MAKE YOURSELF AT HOME"
        title="Settings"
        description="Your profile, your preferences, your workspace."
      />
      <form
        className="settings-layout"
        onSubmit={(e) => {
          e.preventDefault();
          setProfile(form);
          setPreferences({ learning, notifications, team });
          setSaved(true);
        }}
      >
        <section className="settings-section">
          <h2>Your profile</h2>
          <div className="settings-fields">
            {(
              [
                { key: "name", label: "Full name" },
                { key: "role", label: "Your role" },
                { key: "email", label: "Email address" },
              ] as const
            ).map((f) => (
              <div key={f.key} className="form-field">
                <label className="field-label" htmlFor={f.key}>
                  {f.label}
                </label>
                <Input
                  id={f.key}
                  type={f.key === "email" ? "email" : "text"}
                  required
                  value={form[f.key]}
                  onChange={(e) => {
                    setForm({ ...form, [f.key]: e.target.value });
                    setSaved(false);
                  }}
                />
              </div>
            ))}
          </div>
        </section>
        <section className="settings-section">
          <h2>Workspace preferences</h2>
          <div className="setting-toggle">
            <div>
              <strong>Learning reminders</strong>
              <p>A little nudge to keep your learning moving.</p>
            </div>
            <Switch
              checked={learning}
              onCheckedChange={(v) => {
                setLearning(v);
                setSaved(false);
              }}
              aria-label="Learning reminders"
            />
          </div>
          <div className="setting-toggle">
            <div>
              <strong>Agent review updates</strong>
              <p>Stay informed when an agent is reviewed.</p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={(v) => {
                setNotifications(v);
                setSaved(false);
              }}
              aria-label="Agent review updates"
            />
          </div>
        </section>
        <section className="settings-section">
          <h2>Team workspace</h2>
          <label htmlFor="workspace-name" className="field-label">
            Workspace name
          </label>
          <Input
            id="workspace-name"
            value={team}
            onChange={(e) => {
              setTeam(e.target.value);
              setSaved(false);
            }}
          />
          <p className="demo-callout">
            <ShieldCheck size={14} /> Demo workspace · No real team memberships or permissions are
            changed.
          </p>
        </section>
        <Button type="submit">
          Save preferences <Check />
        </Button>
        {saved && (
          <p className="demo-callout" role="status">
            Preferences saved for this demo session.
          </p>
        )}
      </form>
    </div>
  );
}
