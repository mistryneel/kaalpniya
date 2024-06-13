interface HelloProps {
  userEmail?: string;
  credits?: number;
}

export default function Hello({ userEmail, credits }: HelloProps) {
  return (
    <div className="px-2 pt-4">
      <div className="gap-4 items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight mb-1">
          {userEmail ? (
            <span>👋🏼 Hi {userEmail}!</span>
          ) : (
            <span>👋🏼 Hi there!</span>
          )}
        </h1>
        <div className="text-muted-foreground text-sm">
          Hope you're having a great day! You can try out the app below.
          {credits && <span> You still have {credits} credits left.</span>}
        </div>
      </div>
    </div>
  );
}
