"use client";

import { useState } from "react";
import { sortBy } from "ramda";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  // InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Participant } from "./types";
import { list } from "../data/list";

// This would typically come from a backend API
const participants: Participant[] = list;
const sortByName = sortBy<Participant>((participant) => participant.name);

export default function SecretSanta() {
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);
  const [pin, setPin] = useState("");
  const [revealedAssignment, setRevealedAssignment] = useState<string | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleParticipantClick = (participant: Participant) => {
    setSelectedParticipant(participant);
    setPin("");
    setRevealedAssignment(null);
    setIsDialogOpen(true);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedParticipant && pin === selectedParticipant.pin) {
      setRevealedAssignment(selectedParticipant.assignedTo);
    } else {
      alert("Ops, PIN incorreto. Tente novamente.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle
            className="text-2xl font-bold text-center"
            onDoubleClick={() => {
              console.log("LoubaLopes Amigos & Amigas Secret@s");

              participants.map((p) => {
                console.log(`${p.name} pin: ${p.pin}`);
              });
            }}
          >
            LoubaLopes Amigos & Amigas Secret@s
          </CardTitle>
          <CardDescription>Primeiro, clique no teu nome.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortByName(participants).map((participant) => (
              <Button
                key={participant.name}
                onClick={() => handleParticipantClick(participant)}
                className="h-24 text-2xl hover:bg-red-500"
              >
                {participant.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <span className="text-red-900">{selectedParticipant?.name}</span>{" "}
              veja quem você tirou!
            </DialogTitle>
            {!revealedAssignment && (
              <DialogDescription>
                Escreva o teu PIN para mostrar quem você tirou:
              </DialogDescription>
            )}
          </DialogHeader>
          {!revealedAssignment && (
            <form onSubmit={handlePinSubmit} className="space-y-4">
              {/* <Input
                type="password"
                placeholder="Escreva seu PIN (de 4 números)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              /> */}
              Digite seu PIN (de 4 números):
              <InputOTP maxLength={6} value={pin} onChange={(e) => setPin(e)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                type="submit"
                className="w-full h-16 text-lg"
                variant={"destructive"}
              >
                Exibir Amigo ou Amiga
              </Button>
            </form>
          )}
          {revealedAssignment && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">
                Você tirou o(a) seguinte amigo(a) secreto(a):
              </p>
              <p className="text-3xl font-bold text-primary">
                {revealedAssignment}
              </p>
              <p className="text-sm text-gray-500">
                Não conte para ninguém, é segredo!
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
