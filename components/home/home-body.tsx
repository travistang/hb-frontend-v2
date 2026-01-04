import { UserDashboard } from "@/components/home/user-dashboard";
import userService from "@/services/user-service";

export async function HomeBody() {
  const me = await userService.getMe();

  if (me !== null) {
    return <UserDashboard />;
  }

  return (
    <div className="prose w-full max-w-none">
      <h1>Hiking Buddies</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi varius
        nec ex vehicula ornare. Nullam non augue a nulla fringilla pharetra
        ornare id ipsum. Duis ac ex turpis. Vestibulum molestie maximus rutrum.
        Vestibulum est risus, facilisis vitae est et, consectetur cursus neque.
        Suspendisse dignissim ultricies velit, sed tristique orci{" "}
        <a href="#">pellentesque at</a>.
      </p>
      <p>
        Etiam malesuada tortor vel lorem viverra, eu pretium dolor tempus.
        Curabitur interdum nibh dui, <a href="#">faucibus suscipit ipsum</a>{" "}
        bibendum et. Curabitur volutpat dignissim enim hendrerit accumsan. In
        tempus id felis dapibus rutrum. Mauris fringilla orci id aliquam
        efficitur.
      </p>
    </div>
  );
}
