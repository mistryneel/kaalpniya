import { supabase } from "@/lib/utils/supabase/service";

export async function checkUserProfile(userEmail: string) {
  const { data: user, error } = await supabase
    .from("profiles")
    .select()
    .eq("email", userEmail)
    .single();

  if (error) {
    console.error("Error fetching user :", error);
    return null;
  }

  return user;
}

export async function updateUserProfile(
  userEmail: string,
  purchaseType: string
) {
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ purchase: purchaseType })
    .eq("email", userEmail);

  if (updateError) {
    console.error("Error updating user profile:", updateError);
  }
}

export async function addUserCredits(userEmail: string, creditsToAdd: number) {
  const { data: user, error: selectError } = await supabase
    .from("profiles")
    .select("credits")
    .eq("email", userEmail)
    .single();

  if (selectError) {
    console.error("Error fetching user profile:", selectError);
    return;
  }

  const currentCredits = user.credits || 0;
  const newCredits = currentCredits + creditsToAdd;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ credits: newCredits })
    .eq("email", userEmail);

  if (updateError) {
    console.error("Error updating user profile:", updateError);
  }
}

export async function updatePurchasesTable(
  userEmail: string,
  purchaseId: string,
  payload: any,
  purchaseType: string
) {
  const insertSubscriptionsPayload = {
    user_email: userEmail,
    purchase_id: purchaseId,
    payload: payload,
    type: purchaseType,
  };

  const { error: insertError } = await supabase
    .from("purchases")
    .insert([insertSubscriptionsPayload]);

  if (insertError) {
    console.error("Error inserting into purchases table:", insertError);
  }
}
